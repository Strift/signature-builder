var app = new Vue({
	
	el: '#app',

	mounted: function () {
		var vue = this;
		var clipboard = new Clipboard('#copy-button');
		clipboard.on('success', function(e) {
		    e.clearSelection();
		    vue.copiedSignature = true;
		});
	},
	
	data: {
		user: {
			name: 'John',
			surname: 'DOE',
			position: 'CEO',
			phone: '00 00 00 00 00',
			email: 'john.doe@mail.com',
			linkedinUrl: 'https://fr.linkedin.com/in/laurentcazanove',
			twitterUrl: 'https://twitter.com/lau_cazanove'
		},
		informationPanel: {
			visible: true,
			toggleButtonText: 'Hide form'
		},
		copiedSignature: false,
		signature: {
			surnameToUpperCase: true,
			enablePosition: true,
			enablePhone: false,
			enableLinkedin: false,
			enableTwitter: false
		}
	},

	watch: {
		'user.name': function(newValue) {
			this.copiedSignature = false;
			this.user.name = newValue.charAt(0).toUpperCase() + newValue.slice(1);
		},
		'user.surname': function(newValue) {
			this.copiedSignature = false;
			if (this.signature.surnameToUpperCase) {
				this.user.surname = newValue.toUpperCase();
			}
		},
		'user.position': function(newValue) {
			this.copiedSignature = false;
		},
		'user.phone': function(newValue) {
			this.copiedSignature = false;
		},
		'user.email': function(newValue) {
			this.copiedSignature = false;
		},
		'user.linkedinUrl': function(newValue) {
			this.copiedSignature = false;
		},
		'user.twitterUrl': function(newValue) {
			this.copiedSignature = false;
		},
		'signature.surnameToUpperCase': function(newValue) {
			if (newValue) {
				this.user.surname = this.user.surname.toUpperCase();
			}
		}
	},
	
	computed: {
		mailToEmail: function() {
			return 'mailto:' + this.email;
		},

		portraitTitle: function() {
			return 'Picture of ' + this.name + " " + this.surname;
		},
	},

	methods: {
		toggleInformationPanel: function() {
			if (this.informationPanel.visible) {
				this.informationPanel.toggleButtonText = "Show form";
			} else {
				this.informationPanel.toggleButtonText = "Hide form";
			}
			this.informationPanel.visible = !this.informationPanel.visible;
		},

		togglePosition: function() {
			this.signature.enablePosition = !this.signature.enablePosition;
		},

		toggleLinkedin: function() {
			this.signature.enableLinkedin = !this.signature.enableLinkedin;
		},

		toggleTwitter: function() {
			this.signature.enableTwitter = !this.signature.enableTwitter;
		},

		togglePhone: function() {
			this.signature.enablePhone = !this.signature.enablePhone;
		},

		click: function(event) {
			console.log(event);
		}
	}
});

