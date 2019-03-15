'use strict';

module.exports = class Panel
{
	constructor(id)
	{
		this.id = String(id);
		this.frames = [];
	}

	/**
	 * Takes a Aurora config for the the panels and serializes to the format that the Nanoleaf API consumes,
	 * which can then be passed in the animData parameter.
	 *
	 * Format after Serializing:
	 * <numPanels> <panelId0> <numFrames0> <RGBWT01> <RGBWT02> ... <RGBWT0n(0)> <panelId1> <numFrames1> <RGBWT11> <RGBWT12> ... <RGBWT1n(1)> ... ... <panelIdN> <numFramesN> <RGBWTN1> <RGBWTN2> ... <RGBWTNn(N)>
	 * e.g.:
	 * "3 82 1 255 0 255 0 20 60 1 0 255 255 0 20 118 1 0 0 0 0 20",
	 * @returns {string}
	 */
	serialize()
	{
		var result = `${this.id} ${this.frames.length}`;
		this.frames.forEach(f =>
		{
			result += ` ${f.r} ${f.g} ${f.b} ${f.w} ${f.transition}`;
		});
		return result.trim();
	}
};

