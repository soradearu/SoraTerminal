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
siem
clear
help

There may or may not be some easter eggs within the project, hope you don't find'em...`,

  },

  whoami: {
    output: `Sora
━━━━━━━━━━━━━━━━━━━━━
Ethical Hacker
Content Writer`,
  },

  skills: {
    output: `Python
JavaScript
Linux
Web Security
Networking
OSINT`,
  },

  articles: {
    output: `[1] From Phreakers to APTs 1-2
[2] What’s the T(ea) in CTI?
[3] In progress`,
  },

  writeups: {
    output: `[1] OverTheWire Bandit 
[2] Webgoat Walkthrough
[3] In progress`,
  },

  projects: {
    output: `- Sora Terminal
- Jigsaw Blog Next/react
- Pixelheart Gamer App
- Pokemon Wiki React App
- Cyber Security Projects in progress...`,
  },

  contact: {
    output: `Email: soreadearu7@gmail.com
GitHub: github.com/soradearu`,
  },

  socials: {
    output: `
Medium → medium.com/@soraderu
GitHub: github.com/soradearu`,
  },

  matrix: {
    output: `Wake up, Sora...
The matrix has you.`,
  },
  siem: {
  output: 'Launching SIEM dashboard...',
},

  sudo: {
    output: `[sudo] password for guest:

Permission denied.`,
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
theme <colour>`,
},
}

export default commands