# nanoleafy

A command-line tool for interacting with your Nanoleaf Aurora. Also includes a full API client for the Aurora!

Fork from [nanoleaves](https://github.com/JonathanIlk/nanoleafy/commits/master) by C J Silverio <ceejceej@gmail.com> to work with the latest nanoleaves APIs (March 2019).


## CLI usage

Provide the IP address of your Aurora in the environment variable `AURORA_HOST` and your API access token in `AURORA_TOKEN`. If your AURORA is listening on an unusual port, use `AURORA_PORT`.

To generate a token, hold the power key until the light starts flashing, then run `nanoleafy token`.

```
$ nanoleafy --help
Commands:
  animation <name>          get details about the given animation effect
  brightness [number]       get or set the overall brightness
  effect [name]             get or set the current effect
  effects                   list available effects
  hsb <hue> <sat> <bright>  set the hue, sat, and brightness for all panels
  hue [number]              get or set the hue for all panels
  info                      get all available info about your Aurora
  layout                    show the panel layout
  mode                      get the current color mode for the Aurora
  off                       turn your Aurora off
  on                        turn your Aurora on
  panels                    show the panel ids
  random                    run a randomly-chosen effect
  saturation [number]       get or set the overall saturation
  temp [number]             get or set the overall color temperature
  token                     generate a new API access token
  upload <filename>         upload a json file containing a new animation effect

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

## API usage

```js
const AuroraAPI = require('nanoleafy-js');
const aurora = new AuroraAPI({
    host: '10.0.0.2',
    token: 'your-api-token'
});

aurora.info().then(info =>
{
    console.log(info);
});
```

The constructor will default to the values in the above-mentioned environment variables if present.

All API functions return promises.

* `newToken()` - generate a new API token
* `info()` - return all info about the Aurora
* `identify()` - flash panels
* `animation(name)` - get detailed information about a specific animation effect
* `brightness()` - get the brightness for all panels
* `setBrightness(v)` - set the brightness for all panels; 0-100
* `effect()` - get the name of the current effect
* `effects()` - return a list of the names of all effects
* `setEffect(name)` - set the active effect by name
* `hue()` - get the hue for all panels
* `setHue(v)` - set the hue for all panels; 0-360
* `layout()` - get panel layout data
* `mode()` - get the Aurora's current color mode
* `off()` - turn the Aurora off
* `on()` - turn the Aurora on
* `orientation()` - get the global orientation; 0-360
* `saturation()`  - get the saturation for all panels
* `setSaturation(v)` - set the saturation for all panels; 0-100
* `temperature()` - get the color temperature for all panels
* `setTemperature(v)` - set the color temperature for all panels; 1200-6500
* `addAnimation(json)` - store a new animation effect on the Aurora
* `setStaticPanel(data)` - set a panel or a list of panels to a static color; see below

## Static panel structure

The `setStaticPanel()` function pokes a single color into a specific panel or multiple panels.
It is only useful for single frame static displays.  You can call this a couple of ways. This snippet sets panel id 100 to black:

```js
const panel = { id: '100', r: 0,  g: 0,  b: 0 };
aurora.setStaticPanel(panel);
```

This code does the equivalent with a full panel object:

```js
const AuroraAPI = require('nanoleafy-js');

const aurora = new AuroraAPI({
    host: '10.0.0.2',
    token: 'your-api-token'
});

const panel = new AuroraAPI.Panel('100');
panel.frames = [{ r: 0, g: 0, b: 0, w: 0, transition: 50}];

aurora.setStaticPanel(panel);
```

You can also send a list of panels to `setStaticPanel()`:

```js
const list = [
	{ id: 71, r: 255, g: 0, b: 0, transition: 50 },
	{ id: 26, r: 255, g: 51, b: 17, transition: 50 },
	{ id: 72, r: 255, g: 102, b: 68, transition: 50 },
	{ id: 167, r: 255, g: 153, b: 51, transition: 50 },
];
aurora.setStaticPanel(list);
```

If there is an Animation active when setting the static panels, the other panels that are not included in the command will return to the last configuration they retrieved from the static command.


There's an example of setting an entire static animation display in [examples/static-display.js](examples/static-display.js).
Use `nanoleafy panels` from the CLI to get a list of valid panel ids for your setup or get them prgrammatically via the `layout()` command.

## License

ISC
