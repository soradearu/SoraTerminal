const commands = {
  help: {
    output: `Available commands:

whoami
skills
projects
articles
writeups
contact
socials
theme
clear
help

There may or may not be some easter eggs within the project, hope you don't find'em...`,

  },

  whoami: {
    output: `Sora
━━━━━━━━━━━━━━━━━━━━━
Cyber Security Analyst
Writer
Researcher`,
  },

  skills: {
    output: `
    Security:
    >Networking (TCP/IP, DNS, HTTP, TLS)
    >Web Security 
    >Linux
    >Security research / CTI
    >Security+ - in progress
    >Cryptograhy 

    Offensive:
    >OWASP TOP 10
    >Malvare Behavioral Analysis (Learning)
    >Active Directory (Learning)
    >Kerberos & NTLM (Learning)
    >Assembly (Learning)

    Professional:
    >Technical Communication
    >Documentation
    >Continuous learning
    
 
    `
   
  
    
  },

  articles: {
    output: `[1] From Phreakers to APTs 1-2
[2] What’s the T(ea) in CTI?
[3] In progress`
  },

  writeups: {
    output: `[1] OverTheWire Bandit 
[2] Webgoat Walkthrough
[3] Interview Campaign: Attacking your hopes I-II`
  },

  projects: {
    output: `- Sora Terminal
- Interview Attack
- Cyber Detective Database
- Active Directory Lab (Coming Soon) `
  },

  contact: {
    output: `Email: soreadearu7@gmail.com
GitHub: github.com/soradearu`
  },

  socials: {
    output: `
Medium → medium.com/@soradearu
GitHub → github.com/soradearu
Dev.to → dev.to/soradll`
  },

  matrix: {
    output: `Wake up, Sora...
The matrix found you.`
  },
  siem: {
  output: 'Launching SIEM dashboard...'
},

  sudo: {
    output: `[sudo] password for guest:

Permission denied.`
  },
  theme: {
  output: `Available themes:

green
blue
red
amber
pink
white


Usage:
theme <colour>`
},
}

export default commands