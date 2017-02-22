var app = new Vue({
	
	el: '#app',

	mounted: function () {
		var clipboard = new Clipboard('#copy-button');
		clipboard.on('success', function(e) {
		    e.clearSelection();
		});
	},
	
	data: {
		name: 'John',
		surname: 'Doe',
		position: 'CEO',
		phone: '00 00 00 00 00',
		email: 'john.doe@mail.com',
		linkedinUrl: 'https://fr.linkedin.com/in/laurentcazanove',
		twitterUrl: 'https://twitter.com/lau_cazanove',
		informationPanel: {
			visible: true,
			toggleButtonText: 'Hide form'
		}
	},
	
	computed: {
		mailToEmail: function() {
			return 'mailto:' + this.email;
		},

		portraitTitle: function() {
			return 'Picture of ' + this.name + " " + this.surname;
		}
	},

	methods: {
		toggleInformationPanel: function() {
			if (this.informationPanel.visible) {
				this.informationPanel.toggleButtonText = "Show form";
			} else {
				this.informationPanel.toggleButtonText = "Hide form";
			}
			this.informationPanel.visible = !this.informationPanel.visible;
		}
	}
});

