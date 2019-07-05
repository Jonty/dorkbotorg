//when the page loads call the init function
Event.observe(window, 'load', init, false);

/************************************
	setup the page load indicator

**************************************/
var myGlobalHandlers = {
	onCreate: function(){
		Element.show('systemWorking');
	},

	onComplete: function() {
		if(Ajax.activeRequestCount == 0){
			Element.hide('systemWorking');
			}
		}
	};

	Ajax.Responders.register(myGlobalHandlers);

/************************************
  
     Things that happen when the page loads

*************************************/
function init()
{
	//setup event handlers
	

			//CLICK

	Event.observe('blog_button','click',getBlog,false); 
	Event.observe('mail_button','click',getMail,false);
	Event.observe('about_button','click',getAbout,false);
	Event.observe('contact_button','click',getContact,false);

	//load the blog first, at the root when the page loads..	
        var url = 'http://dorkbot.org/dorkbotseoul/blog/';
	var pars = '';

        var myAjax = new Ajax.Updater( 'placeholder', url, { method: 'get', parameters: pars });


}

/************************************

	event handler for blog button click, load the blog

**************************************/
function getBlog()
{
		var url = 'http://dorkbot.org/dorkbotseoul/blog/';
		var pars = '';
		
		var myAjax = new Ajax.Updater( 'placeholder', url, { method: 'get', parameters: pars });

		//turn on blog button turn off others.
		blogOn();
		mailOut();
		aboutOut();
		contactOut();
}

/************************************

        event handler for mail button click, load mail page

**************************************/

function getMail()
{
                var url = 'http://dorkbot.org/dorkbotseoul/mail.html';
                var pars = '';

                var myAjax = new Ajax.Updater( 'placeholder', url, { method: 'get', parameters: pars });

		mailOn();
		blogOut();
		aboutOut();
		contactOut();
}
/************************************

        event handler for about button click, load the about page

**************************************/

function getAbout()
{
                var url = 'http://dorkbot.org/dorkbotseoul/about.html';
                var pars = '';

                var myAjax = new Ajax.Updater( 'placeholder', url, { method: 'get', parameters: pars });

		aboutOn();
		mailOut();
		blogOut();
		contactOut();
}

/************************************

        event handler for contact button click, load contact page

**************************************/

function getContact()
{
                var url = 'http://dorkbot.org/dorkbotseoul/contact.html';
                var pars = '';

                var myAjax = new Ajax.Updater( 'placeholder', url, { method: 'get', parameters: pars });

		contactOn();
		aboutOut();
		mailOut();
		blogOut();

}


