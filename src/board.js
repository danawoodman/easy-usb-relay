/**
 * Control a USB relay board using USB.
 *
 * This code helped a lot in the understanding of what they boards
 * expect for hex inputs:
 * https://github.com/jaketeater/Very-Simple-USB-Relay/blob/master/relay.py
 */
const HID = require('node-hid')

const ALL_ON = 0xfe
const ALL_OFF = 0xfc
const ON = 0xff
const OFF = 0xfd
const VENDOR_ID = 5824
const PRODUCT_ID = 1503

// convert integer to binary representation
const itob = num => Number(parseInt(num, 10).toString(2))

class Board {
  constructor(numRelays = 1, debug = true) {
    if (debug) console.log('NUMBER OF RELAYS:', numRelays)

    this.debug = debug

    this.numRelays = numRelays
    this.relays = Array.from(Array(this.numRelays).keys())

    this.board = new HID.HID(VENDOR_ID, PRODUCT_ID)
    if (!this.board) throw new Error('No device found!')

    this.board.on('data', data => console.log('DATA:', data))
    this.board.on('error', error => console.error('ERROR:', error))

    this.logState()
  }

  getState() {
    const binaryState = itob(this.board.getFeatureReport(1, 8)[7])
    const state = String(binaryState)
      .split('')
      .map(Number)
      .map(v => (v === 0 ? OFF : ON))
    return this.relays.map(index => state[index] || state[0])
  }

  logState() {
    if (!this.debug) return

    console.log('STATE:')
    this.getState().map((state, index) =>
      console.log('-> RELAY:', index, 'STATE:', state === OFF ? 'OFF' : 'ON')
    )
  }

  checkIndex(index) {
    if (index && !this.relays[index])
      throw new Error('Provided index is invalid')
  }

  on(index) {
    this.checkIndex()
    this.trigger([ON, index])
  }

  off(index) {
    this.checkIndex()
    this.trigger([OFF, index])
  }

  allOn() {
    this.trigger([ALL_ON, 0])
  }

  allOff() {
    this.trigger([ALL_OFF, 0])
  }

  trigger(state) {
    if (state.length != 2) {
      throw new Error('easy-usb-relay library error: exactly two arguments required for trigger function.')
    }
    this.logState()
    this.board.sendFeatureReport(state)
  }
}

module.exports = Board
