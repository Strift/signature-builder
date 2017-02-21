var app = new Vue({
	
	el: '#app',
	
	data: {
		name: 'John',
		surname: 'Doe',
		position: 'CEO',
		phone: '00 00 00 00 00',
		email: 'john.doe@mail.com'
	},
	
	computed: {
		mailToEmail: function() {
			return 'mailto:' + this.email
		}
	}
})