<template>
  <div class="container">
    <div class="col-md-12">
      <h1>Mail signature builder</h1>
    </div>
    <div class="col-md-6">
      <h2>
        <span>Information</span>
        <div
          :class="{'hidden-md hidden-lg': informationPanel.visible}"
          class="pull-right"
        >
          <button
            class="btn btn-link"
            @click="toggleInformationPanel"
          >
            {{ informationPanel.toggleButtonText }}
          </button>
        </div>
      </h2>
      <div
        v-if="informationPanel.visible"
        class="panel panel-default"
      >
        <div class="panel-body">
          <form>
            <!-- Name -->
            <div class="form-group">
              <label for="name">Name</label>
              <input
                v-model="user.name"
                type="text"
                name="name"
                class="form-control"
              >
            </div>
            <!-- Surname -->
            <div class="form-group">
              <label for="surname">Surname</label>
              <div class="pull-right">
                <label class="checkbox-inline"><input
                  v-model="signature.surnameToUpperCase"
                  type="checkbox"
                >Uppercase</label>
              </div>
              <input
                v-model="user.surname"
                type="text"
                name="surname"
                class="form-control"
              >
            </div>
            <!-- Position -->
            <div
              v-if="signature.enablePosition"
              class="form-group"
            >
              <label for="position">Position</label>
              <div class="input-group">
                <input
                  v-model="user.position"
                  type="text"
                  name="position"
                  class="form-control"
                >
                <span class="input-group-btn">
                  <button
                    class="btn btn-secondary"
                    type="button"
                    @click="togglePosition"
                  >Remove</button>
                </span>
              </div>
            </div>
            <!-- E-mail -->
            <div class="form-group">
              <label for="email">E-mail</label>
              <input
                v-model="user.email"
                type="email"
                name="email"
                class="form-control"
              >
            </div>
            <!-- Add position -->
            <div
              v-if="!signature.enablePosition"
              class="form-group"
            >
              <button
                class="btn btn-sm btn-primary"
                type="button"
                @click="togglePosition"
              >
                <i
                  class="fa fa-plus"
                  aria-hidden="true"
                /> Position
              </button>
            </div>
            <!-- Phone -->
            <div
              v-if="signature.enablePhone"
              class="form-group"
            >
              <label for="phone">Phone</label>
              <div class="input-group">
                <input
                  v-model="user.phone"
                  type="tel"
                  name="phone"
                  class="form-control"
                >
                <span class="input-group-btn">
                  <button
                    class="btn btn-secondary"
                    type="button"
                    @click="togglePhone"
                  >Remove</button>
                </span>
              </div>
            </div>
            <div
              v-else
              class="form-group"
            >
              <button
                class="btn btn-sm btn-primary"
                type="button"
                @click="togglePhone"
              >
                <i
                  class="fa fa-plus"
                  aria-hidden="true"
                /> Phone
              </button>
            </div>
            <!-- LinkedIn -->
            <div
              v-if="signature.enableLinkedin"
              class="form-group"
            >
              <label for="linkedin">LinkedIn URL</label>
              <div class="input-group">
                <input
                  v-model="user.linkedinUrl"
                  type="text"
                  name="linkedin"
                  class="form-control"
                >
                <span class="input-group-btn">
                  <button
                    class="btn btn-secondary"
                    type="button"
                    @click="toggleLinkedin"
                  >Remove</button>
                </span>
              </div>
            </div>
            <div
              v-else
              class="form-group"
            >
              <button
                class="btn btn-sm btn-primary"
                type="button"
                @click="toggleLinkedin"
              >
                <i
                  class="fa fa-plus"
                  aria-hidden="true"
                /> LinkedIn
              </button>
            </div>
            <!-- Twitter -->
            <div
              v-if="signature.enableTwitter"
              class="form-group"
            >
              <label for="twitter">Twitter URL</label>
              <div class="input-group">
                <input
                  v-model="user.twitterUrl"
                  type="text"
                  name="twitter"
                  class="form-control"
                >
                <span class="input-group-btn">
                  <button
                    class="btn btn-secondary"
                    type="button"
                    @click="toggleTwitter"
                  >Remove</button>
                </span>
              </div>
            </div>
            <div
              v-else
              class="form-group"
            >
              <button
                class="btn btn-sm btn-primary"
                type="button"
                @click="toggleTwitter"
              >
                <i
                  class="fa fa-plus"
                  aria-hidden="true"
                /> Twitter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h2>
        <span>Result</span>
        <div class="pull-right">
          <button
            v-if="copiedSignature"
            class="btn alert-success"
            style="padding: 6px 12px;font-size: 14px;"
          >
            Copied to clipboard!
          </button>
          <button
            v-else
            id="copy-button"
            class="btn btn-default"
            data-clipboard-target="#signature"
          >
            Copy to clipboard <i
              class="fa fa-clipboard"
              aria-hidden="true"
            />
          </button>
        </div>
      </h2>
      <div class="panel panel-default">
        <div class="panel-body">
          <table id="signature">
            <tbody>
              <tr>
                <td
                  v-if="signature.enablePhoto"
                  style="padding-right:15px"
                >
                  <img
                    :src="user.photoUrl"
                    width="100px"
                    height="100px"
                    :alt="portraitTitle"
                    style="border-radius: 100px;-webkit-border-radius: 100px;-moz-border-radius: 100px;"
                  >
                </td>
                <td style="font-size:13px;line-height:14px;font-family:Helvetica,sans-serif">
                  <p style="margin: 8px 0;">
                    <span style="font-weight:bold; font-size: 14px">
                      <span>{{ user.name }}</span> {{ user.surname }}<span v-if="signature.enablePosition">,&nbsp;{{ user.position }}</span>
                      <br>
                    </span>
                    <span style="color:#6d7a80">
                      <span v-if="signature.enablePhone">{{ user.phone }}&nbsp;•&nbsp;</span>
                      <a
                        target="_blank"
                        :href="mailToEmail"
                        style="color:#6d7a80;text-decoration: none;"
                      >{{ user.email }}</a>
                    </span>
                  </p>
                  <p
                    v-if="signature.enableLinkedin"
                    style="margin: 8px 0; font-size: 11px"
                  >
                    <img
                      src="@/assets/img/linkedin-logo.png"
                      alt="LinkedIn logo"
                      height="16"
                      style="margin-right: 2px"
                    ><a
                      target="_blank"
                      :href="user.linkedinUrl"
                    >{{ user.linkedinUrl }}</a>
                  </p>
                  <p
                    v-if="signature.enableTwitter"
                    style="margin: 8px 0; font-size: 11px"
                  >
                    <img
                      src="@/assets/img/twitter-logo.png"
                      alt="Twitter logo"
                      height="16"
                      style="margin-right: 2px"
                    ><a
                      target="_blank"
                      :href="user.twitterUrl"
                    >{{ user.twitterUrl }}</a>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel-footer">
          <div
            v-if="signature.enablePhoto"
            class="form-group"
          >
            <label for="photo">Photo URL</label>
            <div class="input-group">
              <input
                v-model="user.photoUrl"
                type="text"
                name="photo"
                class="form-control"
              >
              <span class="input-group-btn">
                <button
                  class="btn btn-secondary"
                  type="button"
                  @click="togglePhoto"
                >Remove</button>
              </span>
            </div>
          </div>
          <div
            v-else
            class="form-group"
          >
            <button
              class="btn btn-sm btn-primary"
              type="button"
              @click="togglePhoto"
            >
              <i
                class="fa fa-plus"
                aria-hidden="true"
              /> Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> <!-- container -->
</template>

<script>
import Clipboard from 'clipboard'

export default {
  name: 'App',

  data: () => ({
    user: {
      name: 'John',
      surname: 'DOE',
      position: 'CEO',
      phone: '00 00 00 00 00',
      email: 'john.doe@mail.com',
      linkedinUrl: 'https://fr.linkedin.com/in/laurentcazanove',
      twitterUrl: 'https://twitter.com/lau_cazanove',
      photoUrl: 'http://signature.laurentcazanove.com/img/portrait.jpg'
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
      enableTwitter: false,
      enablePhoto: true
    }
  }),

  computed: {
    mailToEmail: function () {
      return 'mailto:' + this.user.email
    },

    portraitTitle: function () {
      return 'Picture of ' + this.user.name + ' ' + this.user.surname
    }
  },

  watch: {
    'user.name': function (newValue) {
      this.copiedSignature = false
      this.user.name = newValue.charAt(0).toUpperCase() + newValue.slice(1)
    },
    'user.surname': function (newValue) {
      this.copiedSignature = false
      if (this.signature.surnameToUpperCase) {
        this.user.surname = newValue.toUpperCase()
      }
    },
    'user.position': function () {
      this.copiedSignature = false
    },
    'user.phone': function () {
      this.copiedSignature = false
    },
    'user.email': function () {
      this.copiedSignature = false
    },
    'user.linkedinUrl': function () {
      this.copiedSignature = false
    },
    'user.twitterUrl': function () {
      this.copiedSignature = false
    },
    'user.photoUrl': function () {
      this.copiedSignature = false
    },
    'signature.surnameToUpperCase': function (newValue) {
      if (newValue) {
        this.user.surname = this.user.surname.toUpperCase()
      }
    }
  },

  mounted: function () {
    var vue = this
    var clipboard = new Clipboard('#copy-button')
    clipboard.on('success', function (e) {
      e.clearSelection()
      vue.copiedSignature = true
    })
  },

  methods: {
    toggleInformationPanel: function () {
      if (this.informationPanel.visible) {
        this.informationPanel.toggleButtonText = 'Show form'
      } else {
        this.informationPanel.toggleButtonText = 'Hide form'
      }
      this.informationPanel.visible = !this.informationPanel.visible
    },

    togglePosition: function () {
      this.signature.enablePosition = !this.signature.enablePosition
    },

    toggleLinkedin: function () {
      this.signature.enableLinkedin = !this.signature.enableLinkedin
    },

    toggleTwitter: function () {
      this.signature.enableTwitter = !this.signature.enableTwitter
    },

    togglePhone: function () {
      this.signature.enablePhone = !this.signature.enablePhone
    },

    togglePhoto: function () {
      this.signature.enablePhoto = !this.signature.enablePhoto
    }
  }
}
</script>
