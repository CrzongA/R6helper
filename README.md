# R6helper
Handy helper app for Rainbow Six Siege players

---

## Development setup
Nodejs and npm is required.

`npm install` will install all required node packages.

`npm start` to start the localhost server on port 3000.

## Roadmap

### Functionality
#### Original
- [x] Map display, multiple panels
- [x] Basic annotation(drawing) support
- [ ] Standard and customizable callouts for rooms
- [ ] More annotating functions (erase, transform, text remark, shapes(arrow, rect, circle))
- [ ] Operators icons and props placement
- [ ] Operator area control colored highlight
- [ ] Temporary cursor-placed marking at same horizontal position across floors, + line-of-sight radius
- [ ] Savable custom markings with props and its radius (valk cam/EE/jammers placements, spawnkill spots, parkour spots etc.)
  - Might implement it locally first, switch to hosted server once sufficient users
- [ ] Animated operator movement along user-defined path, with timeline

#### Extended
- [ ] User R6 stats (K/D, rank etc.)
- [ ] Tactic board (see CoachBase)
- [ ] Integrate VOD review (maybemaybe)
- [ ] Callout quiz (click room according to callout, vice versa)

### Platform & Device support
- [ ] Convert to React Native for mobile support (Tablet prior)
- [ ] Android or iOS first?

