describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    //empty database
  })
  
  it('front page can be opened', function() {
    cy.contains('Blogs')	
    //cy.contains('Blog App by Amy Johnson')
  })
  
  it('login form can be opened', function() {
    cy.contains('login').click()
  })
  
  describe('Login', function () {
  
  it('succeeds with correct credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('ajohnson')
    cy.get('#password').type('testing123')
    cy.get('#login-button').click()
    
    cy.contains('Amy is logged in')
  })
  
  it('fails with wrong credentials for wrong username and password', function() {
    cy.contains('login').click()
    cy.get('#username').type('ajames')
    cy.get('#password').type('test')
    cy.get('#login-button').click()
    
    cy.get('html').should('not.contain', 'Amy is logged in')
    
    cy.get('.errorStyle')
      .contains('Error: Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid') 
  
  })
  
  it('fails with wrong credentials for right username but wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('ajohnson')
    cy.get('#password').type('testing124')
    cy.get('#login-button').click()
    
    cy.get('html').should('not.contain', 'Amy is logged in')
    
    cy.get('.errorStyle')
      .contains('Error: Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
  
  })
  
  describe('when logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', 
        {username: 'ajohnson', password: 'testing123'})
        .then((response) => {
          localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })
    
    it('a new blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('How to Play the Clarinet')
      cy.get('#author').type('Squidward Tentacles')
      cy.get('#url').type('instructables.com/howtoplaytheclarinet')
      cy.contains('create').click()
      
      cy.get('html').should('contain', 'How to Play the Clarinet by Squidward Tentacles')
    })
    
    it('user can like a blog', function() {
      cy.contains('view').click()
      cy.contains('like').click()
    })
    
    it('the person who created the blog can see the delete button', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('How to Make Money')
      cy.get('#author').type('Mr. Krabs')
      cy.get('#url').type('instructables.com/howtomakemoney')
      cy.contains('create').click()
      
      cy.contains('How to Make Money by Mr. Krabs')
        .contains('view').click()
        
      cy.contains('delete').click()
    })
    
    it('blogs displayed are in order of likes with most likes first', function() {
      //NOTE: DUE TO DB BEING AFFECTED, THIS CODE MIGHT BREAK AND THE ORDER NEED TO BE SWITCHED
      cy.get('.default-view').eq(1).should('contain', 'Five Foods That Can Be Eaten Sexily by Blown Dopamine Receptors')
      cy.get('.default-view').eq(0).should('contain', 'There Are Hot And Ready Single Sandwiches In Your Area! by Not A Scam')
      
      cy.get('.default-view')
        .contains('Five Foods That Can Be Eaten Sexily by Blown Dopamine Receptors')
        .contains('view')
        .click()
      //cy.get('.default-view')
      //  .contains('There Are Hot And Ready Single Sandwiches In Your Area! by Not A Scam')
      //  .contains('view')
      //  .click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('like').click()
      
      cy.contains('hide').click()
      
      cy.get('.default-view').eq(0).should('contain', 'Five Foods That Can Be Eaten Sexily by Blown Dopamine Receptors')
      cy.get('.default-view').eq(1).should('contain', 'There Are Hot And Ready Single Sandwiches In Your Area! by Not A Scam')
    })
      
  
    })
    
    describe('when logged in as other user', function() {
      beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/login', 
          {username: 'root', password: 'salainen'})
          .then((response) => {
            localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
            cy.visit('http://localhost:3000')
          })
      })
      it('the person who did not create the blog cannot see the delete button', function() {
        cy.contains('view').click()
        cy.get('html').should('not.contain', 'delete')
      })
    
    })
  })
})