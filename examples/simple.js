const { Board } = require('../src/relays')

const numRelays = 2
const relays = new Board(numRelays)

// Make sure the relay defaults to off
relays.allOff()

relays.on(1)
setTimeout(() => relays.off(1), 500)
setTimeout(() => relays.on(2), 500)
setTimeout(() => relays.allOn(), 1000)
setTimeout(() => relays.allOff(), 2000)
