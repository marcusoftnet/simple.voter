# simple.voter
A very simple voting app

Simple voter

List a number of strings

Let people (IP address) add +1 or -1 per item

Database

    {
      "questions": [
          { 
            "title" : "My first question"
            "votes" : [
              { 
                "ip" : "127.0.1.1",
                "vote" : "1"
              },
              { 
                "ip" : "127.0.1.2",
                "vote" : "-1"
              }
            ]
    	  },
    	 { 
            "title" : "My second question"
            "votes" : [
              { 
                "ip" : "127.0.1.1",
                "vote" : "-1"
              },
              { 
                "ip" : "127.0.1.2",
                "vote" : "1"
              }
            ]
    	  }
      	]
      }
    }



    {
      "questions": [
          { 
            "id" : 1,
            "title" : "My first question",
            "plusvotes" : 40,
            "minusvotes" : 30,
            "sum" : 10
          },
          {
            "id" : 2,
            "title" : "My second question"
            "plusvotes" : 30,
            "minusvotes" : 40,
            "sum" : -10
    	  }
      	]
      }
    }

GET / - returns all questions with current votes, ordered by sum. Still want to track the invidual up/down votes too. 

POST /{1}/vote - { plus : 1 }, { minusvotes: 1} 

