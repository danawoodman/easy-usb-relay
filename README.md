# easy-usb-relay

**THIS IS CURRENTLY IN AN EXPERIMENTAL STATE:** It does not yet support multiple boards or other manufacturers. Coming soon...

> A Node.js library to control USB connected relays

## Setup

```bash
npm install --save usbrelay
```

## Usage

```js
const { Board } = require('usbrelay')

const numRelays = 2
const relays = new Board(numRelays)

// Turn all relays off:
relays.allOff()

// Turn all relays on:
relays.allOn()

// Turn relay #1 on:
relays.on(1)

// Turn relay #1 off:
relays.off(1)
```

Please see [examples directory](/examples) for more examples on using `usbrelay`

## API

### `relays.allOff()`

Turn all relays off.

### `relays.allOn()`

Turn all relays on.

### `relays.on(index)`

Turn relay with `index` on. Index starts at `1` and goes to the number of available relays. Throws an exception if the relay `index` is greater than the available number of relays.

### `relays.off(index)`

Turn relay with `index` off. Index starts at `1` and goes to the number of available relays. Throws an exception if the relay `index` is greater than the available number of relays.

## Contribute

Contributions welcome! Please submit a Pull Request and make sure to format your code with Prettier and write tests!

## License

MIT

## Credits

&copy; [Dana Woodman](http://danawoodman.com) 2018
