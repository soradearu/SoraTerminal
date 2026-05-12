export default function executeCommand(input, commands) {
  const trimmed = input.trim().toLowerCase()

  if (trimmed === 'clear') {
    return {
      clear: true,
    }
  }

  if (commands[trimmed]) {
    return {
      output: commands[trimmed].output,
    }
  }

  return {
    output: `Command not found: ${trimmed}`,
  }
}