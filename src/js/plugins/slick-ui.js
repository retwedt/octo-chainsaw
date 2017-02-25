/** 
 * SlickUI module.
 * This is a light wrapper around SlickUI's dist file so that it plays nicely
 * with our module structure. Instead of exposing a SlickUI global like 
 * slick-ui.min.js does, this exports the SlickUI object. Steps to update:
 *  1. Copy and paste the latest slick-ui.min.js into the IIFE below.
 *  2. Remove the "SlickUI = {};" line at the beginning of the pasted contents.
 * 
 * @module SlickUI 
 */

var SlickUI = {};
module.exports = SlickUI;

(function () {

    // slick-ui.min.js v0.1
    // eslint-disable-next-line
    SlickUI.namespace=function(a){var b=a.split("."),c=SlickUI;for(var d in b){var e=b[d];c=c[e]=c[e]?c[e]:{}}return SlickUI[a]},Phaser.Plugin.SlickUI=function(a,b){Phaser.Plugin.call(this,a,b),this.defaultRenderer={button:"SlickUI.Element.Renderer.ButtonRenderer",checkbox:"SlickUI.Element.Renderer.CheckboxRenderer",panel:"SlickUI.Element.Renderer.PanelRenderer",slider:"SlickUI.Element.Renderer.SliderRenderer",text_field:"SlickUI.Element.Renderer.TextFieldRenderer",keyboard:"SlickUI.Element.Renderer.KeyboardRenderer",key:"SlickUI.Element.Renderer.KeyRenderer"},this.renderer={}},Phaser.Plugin.SlickUI.prototype=Object.create(Phaser.Plugin.prototype),Phaser.Plugin.SlickUI.prototype.constructor=Phaser.Plugin.SamplePlugin,Phaser.Plugin.SlickUI.prototype.load=function(a){this.container=new SlickUI.Container.Container(this);var b=a.replace(/\/[^\/]+$/,"/");this.game.load.json("slick-ui-theme",a),this.game.load.resetLocked=!0,this.game.load.start();var c=!1,d=function(){if(this.game.cache.checkJSONKey("slick-ui-theme")&&!c){var a=this.game.cache.getJSON("slick-ui-theme");for(var e in a.images)this.game.load.image("slick-ui-"+e,b+a.images[e]);for(e in a.fonts)this.game.load.bitmapFont(e,b+a.fonts[e][0],b+a.fonts[e][1]);c=!0,this.game.load.onFileComplete.remove(d)}};this.game.load.onFileComplete.add(d,this)},Phaser.Plugin.SlickUI.prototype.add=function(a){return this.container.add(a)},Phaser.Plugin.SlickUI.prototype.getRenderer=function(a){if("undefined"!=typeof this.renderer[a])return this.renderer[a];var b=this.game.cache.getJSON("slick-ui-theme"),c=function(a){var b=a.split("."),c=window;for(var d in b)c=c[b[d]];return c};if("undefined"==typeof b.renderer||"undefined"==typeof b.renderer[a]){if("undefined"==typeof this.defaultRenderer[a])throw new Error("Trying to access undefined renderer '"+a+"'.");return this.renderer[a]=new(c(this.defaultRenderer[a]))(this.game)}return this.renderer[a]=new(c(b.renderer[a]))(this.game)},SlickUI.namespace("Container"),SlickUI.Container.Container=function(a){this.root=null,a instanceof SlickUI.Container.Container||(this.root=a,a=null),this.parent=a,this.children=[],a?(this.root=a.root,this.displayGroup=this.root.game.add.group(),a.displayGroup.add(this.displayGroup),this.x=a.x,this.y=a.y,this.width=a.width,this.height=a.height):(this.displayGroup=this.root.game.add.group(),this.x=0,this.y=0,this.width=this.root.game.width,this.height=this.root.game.height)},SlickUI.Container.Container.prototype.add=function(a){return a.setContainer(this),"function"==typeof a.init&&a.init(),this.root.game.world.bringToTop(this.displayGroup),this.children.push(a),a},SlickUI.namespace("Element"),SlickUI.Element.Button=function(a,b,c,d){this._x=a,this._y=b,this._offsetX=a,this._offsetY=b,this._width=c,this._height=d,this.container=null},SlickUI.Element.Button.prototype.setContainer=function(a){this.container=new SlickUI.Container.Container(a)},SlickUI.Element.Button.prototype.init=function(){var a=this.container.root.game.cache.getJSON("slick-ui-theme"),b=this.container.x=this.container.parent.x+this._x,c=this.container.y=this.container.parent.y+this._y,d=this.container.width=Math.min(this.container.parent.width-this._x,this._width),e=this.container.height=Math.min(this.container.parent.height-this._y,this._height);this.container.x+=Math.round(a.button["border-x"]/2),this.container.y+=Math.round(a.button["border-y"]/2),this.container.width-=a.button["border-x"],this.container.height-=a.button["border-y"];var f=this.container.root.getRenderer("button").render(d,e);this.spriteOff=f[0],this.spriteOn=f[1],this.sprite=this.container.root.game.make.button(b,c),this.sprite.loadTexture(this.spriteOff.texture),this.container.displayGroup.add(this.sprite),this.sprite.x=b,this.sprite.y=c,this._offsetX=b,this._offsetY=c,this.sprite.fixedToCamera=!0;var g=!1;this.sprite.events.onInputOver.add(function(){g=!0},this),this.sprite.events.onInputOut.add(function(){g=!1},this),this.sprite.events.onInputDown.add(function(){this.sprite.loadTexture(this.spriteOn.texture)},this),this.sprite.events.onInputUp.add(function(){this.sprite.loadTexture(this.spriteOff.texture),g||this.sprite.events.onInputUp.halt()},this),this.events=this.sprite.events},SlickUI.Element.Button.prototype.add=function(a){return this.container.add(a)},Object.defineProperty(SlickUI.Element.Button.prototype,"x",{get:function(){return this._x-this.container.parent.x},set:function(a){this._x=a,this.container.displayGroup.x=this.container.parent.x+a-this._offsetX}}),Object.defineProperty(SlickUI.Element.Button.prototype,"y",{get:function(){return this._y-this.container.parent.y},set:function(a){this._y=a,this.container.displayGroup.y=this.container.parent.y+a-this._offsetY}}),Object.defineProperty(SlickUI.Element.Button.prototype,"visible",{get:function(){return this.container.displayGroup.visible},set:function(a){this.container.displayGroup.visible=a}}),Object.defineProperty(SlickUI.Element.Button.prototype,"alpha",{get:function(){return this.container.displayGroup.alpha},set:function(a){this.container.displayGroup.alpha=a}}),Object.defineProperty(SlickUI.Element.Button.prototype,"width",{get:function(){return this.container.width},set:function(a){var b=this.container.root.game.cache.getJSON("slick-ui-theme");this._width=Math.round(a+b.button["border-x"]),this.sprite.destroy(),this.init(),this.container.displayGroup.sendToBack(this.sprite)}}),Object.defineProperty(SlickUI.Element.Button.prototype,"height",{get:function(){return this.container.height},set:function(a){var b=this.container.root.game.cache.getJSON("slick-ui-theme");this._height=Math.round(a+b.button["border-y"]),this.sprite.destroy(),this.init(),this.container.displayGroup.sendToBack(this.sprite)}}),SlickUI.namespace("Element"),SlickUI.Element.Checkbox=function(a,b,c){this._x=a,this._y=b,this.container=null,this._checked=!1,this.type=c,"undefined"==typeof c&&(this.type=SlickUI.Element.Checkbox.TYPE_CHECKBOX)},SlickUI.Element.Checkbox.TYPE_CHECKBOX=0,SlickUI.Element.Checkbox.TYPE_RADIO=1,SlickUI.Element.Checkbox.TYPE_CROSS=2,SlickUI.Element.Checkbox.prototype.setContainer=function(a){this.container=a},SlickUI.Element.Checkbox.prototype.init=function(){var a,b=this.container.x+this._x,c=this.container.y+this._y;switch(this.type){case SlickUI.Element.Checkbox.TYPE_RADIO:a="radio";break;case SlickUI.Element.Checkbox.TYPE_CROSS:a="cross";break;default:a="check"}var d=this.container.root.getRenderer("checkbox").render(a);this.sprite=this.container.root.game.make.sprite(0,0,d[0].texture),this.sprite.x=b,this.sprite.y=c,this._spriteOff=d[0],this._spriteOn=d[1],this.displayGroup=this.container.root.game.add.group(),this.displayGroup.add(this.sprite),this.container.displayGroup.add(this.displayGroup),this.sprite.inputEnabled=!0,this.sprite.fixedToCamera=!0,this.input.useHandCursor=!0,this.events.onInputDown.add(function(){this.checked=!this.checked},this)},Object.defineProperty(SlickUI.Element.Checkbox.prototype,"x",{get:function(){return this.displayGroup.x+this._x},set:function(a){this.displayGroup.x=a-this._x}}),Object.defineProperty(SlickUI.Element.Checkbox.prototype,"y",{get:function(){return this.displayGroup.y+this._y},set:function(a){this.displayGroup.y=a-this._y}}),Object.defineProperty(SlickUI.Element.Checkbox.prototype,"checked",{get:function(){return this._checked},set:function(a){this._checked=a,a?this.sprite.loadTexture(this._spriteOn.texture):this.sprite.loadTexture(this._spriteOff.texture)}}),Object.defineProperty(SlickUI.Element.Checkbox.prototype,"visible",{get:function(){return this.sprite.visible},set:function(a){this.sprite.visible=a}}),Object.defineProperty(SlickUI.Element.Checkbox.prototype,"alpha",{get:function(){return this.sprite.alpha},set:function(a){this.sprite.alpha=a}}),Object.defineProperty(SlickUI.Element.Checkbox.prototype,"events",{get:function(){return this.sprite.events}}),Object.defineProperty(SlickUI.Element.Checkbox.prototype,"input",{get:function(){return this.sprite.input}}),Object.defineProperty(SlickUI.Element.Checkbox.prototype,"width",{get:function(){return this.sprite.width},set:function(a){this.sprite.width=a}}),Object.defineProperty(SlickUI.Element.Checkbox.prototype,"height",{get:function(){return this.sprite.height},set:function(a){this.sprite.height=a}}),SlickUI.namespace("Element"),SlickUI.Element.DisplayObject=function(a,b,c,d,e){this._x=a,this._y=b,this._offsetX=a,this._offsetY=b,this.displayObject=c,this.container=null,this._width=d,this._height=e},SlickUI.Element.DisplayObject.prototype.setContainer=function(a){this.container=new SlickUI.Container.Container(a),"undefined"==typeof this._width&&(this._width=this.container.root.game.width),"undefined"==typeof this._height&&(this._height=this.container.root.game.height)},SlickUI.Element.DisplayObject.prototype.init=function(){var a=this.container.x=this.container.parent.x+this._x,b=this.container.y=this.container.parent.y+this._y;this.container.width=Math.min(this.container.parent.width-this._x,this._width),this.container.height=Math.min(this.container.parent.height-this._y,this._height),!this.displayObject instanceof Phaser.Sprite?this.sprite=this.container.root.game.make.sprite(a,b,this.displayObject):this.sprite=this.displayObject,this.container.displayGroup.add(this.sprite),this.sprite.x=a,this.sprite.y=b,this._offsetX=a,this._offsetY=b,this.sprite.fixedToCamera=!0},SlickUI.Element.DisplayObject.prototype.add=function(a){return this.container.add(a)},Object.defineProperty(SlickUI.Element.DisplayObject.prototype,"x",{get:function(){return this._x-this.container.parent.x},set:function(a){this._x=a,this.container.displayGroup.x=this.container.parent.x+a-this._offsetX}}),Object.defineProperty(SlickUI.Element.DisplayObject.prototype,"y",{get:function(){return this._y-this.container.parent.y},set:function(a){this._y=a,this.container.displayGroup.y=this.container.parent.y+a-this._offsetY}}),Object.defineProperty(SlickUI.Element.DisplayObject.prototype,"visible",{get:function(){return this.container.displayGroup.visible},set:function(a){this.container.displayGroup.visible=a}}),Object.defineProperty(SlickUI.Element.DisplayObject.prototype,"alpha",{get:function(){return this.container.displayGroup.alpha},set:function(a){this.container.displayGroup.alpha=a}}),Object.defineProperty(SlickUI.Element.DisplayObject.prototype,"inputEnabled",{get:function(){return this.sprite.inputEnabled},set:function(a){this.sprite.inputEnabled=a,a?this.input=this.sprite.input:this.input=null}}),Object.defineProperty(SlickUI.Element.DisplayObject.prototype,"events",{get:function(){return this.sprite.events}}),Object.defineProperty(SlickUI.Element.DisplayObject.prototype,"width",{get:function(){return this.container.width},set:function(a){this._width=a,this.sprite.destroy(),this.init(),this.container.displayGroup.sendToBack(this.sprite)}}),Object.defineProperty(SlickUI.Element.DisplayObject.prototype,"height",{get:function(){return this.container.height},set:function(a){this._height=a,this.sprite.destroy(),this.init(),this.container.displayGroup.sendToBack(this.sprite)}}),SlickUI.namespace("Element"),SlickUI.Element.Panel=function(a,b,c,d){this._x=a,this._y=b,this._offsetX=a,this._offsetY=b,this._width=c,this._height=d,this.container=null},SlickUI.Element.Panel.prototype.setContainer=function(a){this.container=new SlickUI.Container.Container(a)},SlickUI.Element.Panel.prototype.init=function(){var a=this.container.root.game.cache.getJSON("slick-ui-theme"),b=this.container.x=this.container.parent.x+this._x,c=this.container.y=this.container.parent.y+this._y,d=this.container.width=Math.min(this.container.parent.width-this._x,this._width),e=this.container.height=Math.min(this.container.parent.height-this._y,this._height);this.container.x+=Math.round(a.panel["border-x"]/2),this.container.y+=Math.round(a.panel["border-y"]/2),this.container.width-=a.panel["border-x"],this.container.height-=a.panel["border-y"],this._sprite=this.container.displayGroup.add(this.container.root.getRenderer("panel").render(d,e)),this._sprite.x=b,this._sprite.y=c,this._sprite.fixedToCamera=!0,this._offsetX=b,this._offsetY=c},SlickUI.Element.Panel.prototype.add=function(a){return this.container.add(a)},SlickUI.Element.Panel.prototype.destroy=function(){this.container.displayGroup.removeAll(!0),this.container.displayGroup.destroy(),this.container.children=[],this.container=void 0,this.sprite=void 0},Object.defineProperty(SlickUI.Element.Panel.prototype,"x",{get:function(){return this._x-this.container.parent.x},set:function(a){this._x=a,this.container.displayGroup.x=this.container.parent.x+a-this._offsetX}}),Object.defineProperty(SlickUI.Element.Panel.prototype,"y",{get:function(){return this._y-this.container.parent.y},set:function(a){this._y=a,this.container.displayGroup.y=this.container.parent.y+a-this._offsetY}}),Object.defineProperty(SlickUI.Element.Panel.prototype,"visible",{get:function(){return this.container.displayGroup.visible},set:function(a){this.container.displayGroup.visible=a}}),Object.defineProperty(SlickUI.Element.Panel.prototype,"alpha",{get:function(){return this.container.displayGroup.alpha},set:function(a){this.container.displayGroup.alpha=a}}),Object.defineProperty(SlickUI.Element.Panel.prototype,"width",{get:function(){return this.container.width},set:function(a){var b=this.container.root.game.cache.getJSON("slick-ui-theme");this._width=Math.round(a+b.panel["border-x"]),this._sprite.destroy(),this.init(),this.container.displayGroup.sendToBack(this._sprite)}}),Object.defineProperty(SlickUI.Element.Panel.prototype,"height",{get:function(){return this.container.height},set:function(a){var b=this.container.root.game.cache.getJSON("slick-ui-theme");this._height=Math.round(a+b.panel["border-y"]),this._sprite.destroy(),this.init(),this.container.displayGroup.sendToBack(this._sprite)}}),SlickUI.namespace("Element.Renderer"),SlickUI.Element.Renderer.ButtonRenderer=function(a){this.game=a},SlickUI.Element.Renderer.ButtonRenderer.prototype.render=function(a,b){var c=this.game.cache.getJSON("slick-ui-theme"),d=this,e=function(e){var f=d.game.add.bitmapData(a,b);return f.copyRect(e,new Phaser.Rectangle(0,0,c.button["border-x"],c.button["border-y"])),f.copy(e,c.button["border-x"]+1,0,1,c.button["border-y"],c.button["border-x"],0,a-2*c.button["border-x"],c.button["border-y"]),f.copyRect(e,new Phaser.Rectangle(e.width-c.button["border-x"],0,c.button["border-x"],c.button["border-y"]),a-c.button["border-x"]),f.copy(e,0,c.button["border-y"]+1,c.button["border-x"],1,0,c.button["border-y"],c.button["border-x"],b-2*c.button["border-y"]),f.copy(e,e.width-c.button["border-x"],c.button["border-y"]+1,c.button["border-x"],1,a-c.button["border-x"],c.button["border-y"],c.button["border-x"],b-2*c.button["border-y"]),f.copyRect(e,new Phaser.Rectangle(0,e.height-c.button["border-y"],c.button["border-x"],c.button["border-y"]),0,b-c.button["border-y"]),f.copyRect(e,new Phaser.Rectangle(e.width-c.button["border-x"],e.height-c.button["border-y"],c.button["border-x"],c.button["border-y"]),a-c.button["border-x"],b-c.button["border-y"]),f.copy(e,c.button["border-x"]+1,e.height-c.button["border-y"],1,c.button["border-y"],c.button["border-x"],b-c.button["border-y"],a-2*c.button["border-x"],c.button["border-y"]),f.copy(e,c.button["border-x"],c.button["border-y"],1,1,c.button["border-x"],c.button["border-y"],a-2*c.button["border-x"],b-2*c.button["border-y"]),d.game.make.sprite(0,0,f)},f=e(this.game.make.sprite(0,0,"slick-ui-button_off")),g=e(this.game.make.sprite(0,0,"slick-ui-button_on"));return[f,g]},SlickUI.namespace("Element.Renderer"),SlickUI.Element.Renderer.CheckboxRenderer=function(a){this.game=a},SlickUI.Element.Renderer.CheckboxRenderer.prototype.render=function(a){var b=this.game.make.sprite(0,0,"slick-ui-"+a+"_off"),c=this.game.make.sprite(0,0,"slick-ui-"+a+"_on");return[b,c]},SlickUI.namespace("Element.Renderer"),SlickUI.Element.Renderer.KeyRenderer=function(a){this.game=a},SlickUI.Element.Renderer.KeyRenderer.prototype.render=function(a,b){var c=this.game.make.graphics(0,0);c.beginFill(13619151),c.drawRoundedRect(0,0,a,b,5),c.beginFill(16777215),c.drawRoundedRect(1,1,a-2,b-2,5);var d=this.game.make.graphics(0,0);d.beginFill(1542840),d.drawRoundedRect(0,0,a,b,5),d.beginFill(2074593),d.drawRoundedRect(1,1,a-2,b-2,5);var e=this.game.make.sprite(0,0,c.generateTexture()),f=this.game.make.sprite(0,0,d.generateTexture());return[e,f]},SlickUI.namespace("Element.Renderer"),SlickUI.Element.Renderer.KeyboardRenderer=function(a){this.game=a},SlickUI.Element.Renderer.KeyboardRenderer.prototype.render=function(a){var b=this.game.make.bitmapData(this.game.width,a);return b.ctx.beginPath(),b.ctx.rect(0,0,this.game.width,a),b.ctx.fillStyle="#cccccc",b.ctx.fill(),b.ctx.beginPath(),b.ctx.rect(0,2,this.game.width,a-2),b.ctx.fillStyle="#f0f0f0",b.ctx.fill(),this.game.make.sprite(0,0,b)},SlickUI.namespace("Element.Renderer"),SlickUI.Element.Renderer.PanelRenderer=function(a){this.game=a},SlickUI.Element.Renderer.PanelRenderer.prototype.render=function(a,b){var c=this.game.cache.getJSON("slick-ui-theme"),d=this.game.add.bitmapData(this.game.width,this.game.height),e=this.game.make.sprite(0,0,"slick-ui-panel");return d.copyRect(e,new Phaser.Rectangle(0,0,c.panel["border-x"],c.panel["border-y"])),d.copy(e,c.panel["border-x"]+1,0,1,c.panel["border-y"],c.panel["border-x"],0,a-2*c.panel["border-x"],c.panel["border-y"]),d.copyRect(e,new Phaser.Rectangle(e.width-c.panel["border-x"],0,c.panel["border-x"],c.panel["border-y"]),a-c.panel["border-x"]),d.copy(e,0,c.panel["border-y"]+1,c.panel["border-x"],1,0,c.panel["border-y"],c.panel["border-x"],b-2*c.panel["border-y"]),d.copy(e,e.width-c.panel["border-x"],c.panel["border-y"]+1,c.panel["border-x"],1,a-c.panel["border-x"],c.panel["border-y"],c.panel["border-x"],b-2*c.panel["border-y"]),d.copyRect(e,new Phaser.Rectangle(0,e.height-c.panel["border-y"],c.panel["border-x"],c.panel["border-y"]),0,b-c.panel["border-y"]),d.copyRect(e,new Phaser.Rectangle(e.width-c.panel["border-x"],e.height-c.panel["border-y"],c.panel["border-x"],c.panel["border-y"]),a-c.panel["border-x"],b-c.panel["border-y"]),d.copy(e,c.panel["border-x"]+1,e.height-c.panel["border-y"],1,c.panel["border-y"],c.panel["border-x"],b-c.panel["border-y"],a-2*c.panel["border-x"],c.panel["border-y"]),d.copy(e,c.panel["border-x"],c.panel["border-y"],1,1,c.panel["border-x"],c.panel["border-y"],a-2*c.panel["border-x"],b-2*c.panel["border-y"]),this.game.make.sprite(0,0,d)},SlickUI.namespace("Element.Renderer"),SlickUI.Element.Renderer.SliderRenderer=function(a){this.game=a},SlickUI.Element.Renderer.SliderRenderer.prototype.render=function(a,b){var c=(this.game.cache.getJSON("slick-ui-theme"),this.game.make.sprite(0,0,"slick-ui-slider_base")),d=this.game.make.sprite(0,0,"slick-ui-slider_end"),e=this.game.add.bitmapData(a,d.height);e.copy(c,0,0,1,c.height,0,Math.round(d.height/4),a,c.height),e.copy(d,0,0,d.width,d.height,0,0,d.width,d.height),e.copy(d,0,0,d.width,d.height,a-d.width,0,d.width,d.height);var f=this.game.make.sprite(0,0,"slick-ui-slider_handle_off"),g=this.game.make.sprite(0,0,"slick-ui-slider_handle_on");return c=this.game.make.sprite(0,0,e),b&&(c.angle=90),[c,f,g]},SlickUI.namespace("Element.Renderer"),SlickUI.Element.Renderer.TextFieldRenderer=function(a){this.game=a},SlickUI.Element.Renderer.TextFieldRenderer.prototype.render=function(a,b){var c=this.game.cache.getJSON("slick-ui-theme"),d=this.game.add.bitmapData(a,b),e=this.game.make.sprite(0,0,"slick-ui-text_field");return d.copyRect(e,new Phaser.Rectangle(0,0,c.text_field["border-x"],c.text_field["border-y"])),d.copy(e,c.text_field["border-x"]+1,0,1,c.text_field["border-y"],c.text_field["border-x"],0,a-2*c.text_field["border-x"],c.text_field["border-y"]),d.copyRect(e,new Phaser.Rectangle(e.width-c.text_field["border-x"],0,c.text_field["border-x"],c.text_field["border-y"]),a-c.text_field["border-x"]),d.copy(e,0,c.text_field["border-y"]+1,c.text_field["border-x"],1,0,c.text_field["border-y"],c.text_field["border-x"],b-2*c.text_field["border-y"]),d.copy(e,e.width-c.text_field["border-x"],c.text_field["border-y"]+1,c.text_field["border-x"],1,a-c.text_field["border-x"],c.text_field["border-y"],c.text_field["border-x"],b-2*c.text_field["border-y"]),d.copyRect(e,new Phaser.Rectangle(0,e.height-c.text_field["border-y"],c.text_field["border-x"],c.text_field["border-y"]),0,b-c.text_field["border-y"]),d.copyRect(e,new Phaser.Rectangle(e.width-c.text_field["border-x"],e.height-c.text_field["border-y"],c.text_field["border-x"],c.text_field["border-y"]),a-c.text_field["border-x"],b-c.text_field["border-y"]),d.copy(e,c.text_field["border-x"]+1,e.height-c.text_field["border-y"],1,c.text_field["border-y"],c.text_field["border-x"],b-c.text_field["border-y"],a-2*c.text_field["border-x"],c.text_field["border-y"]),d.copy(e,c.text_field["border-x"],c.text_field["border-y"],1,1,c.text_field["border-x"],c.text_field["border-y"],a-2*c.text_field["border-x"],b-2*c.text_field["border-y"]),this.game.make.sprite(0,0,d)},SlickUI.namespace("Element"),SlickUI.Element.Slider=function(a,b,c,d,e){this._x=a,this._y=b,this._size=c,this._value=d,this._vertical=!0===e,this.container=null,"undefined"==typeof d&&(this._value=1),this._vertical&&(this._value=Math.abs(this._value-1))},SlickUI.Element.Slider.prototype.setContainer=function(a){this.container=a},SlickUI.Element.Slider.prototype.init=function(){this.container.root.game.cache.getJSON("slick-ui-theme");this.onDragStart=new Phaser.Signal,this.onDrag=new Phaser.Signal,this.onDragStop=new Phaser.Signal,this.displayGroup=game.add.group();var a=this.container.x+this._x,b=this.container.y+this._y,c=this._vertical?b:a,d=this._vertical?"y":"x",e=Math.min(this.container.width-this._x,this._size);this._vertical&&(e=Math.min(this.container.height-this._y,this._size));var f=Math.min(1,Math.max(0,this._value))*e+c,g=this.container.root.getRenderer("slider").render(e,this._vertical),h=g[0],i=g[1],j=g[2];h.x=a,h.y=b;var k=this.container.root.game.make.sprite(this._vertical?a:f,this._vertical?f:b,i.texture);k.anchor.setTo(.5),this._vertical&&(k.angle=270),h.fixedToCamera=!0,k.fixedToCamera=!0,k.inputEnabled=!0,k.input.useHandCursor=!0;var l=!1,m=function(){var a=(k.cameraOffset[d]-c)/e;return this._vertical&&(a=Math.abs(a-1)),a};k.events.onInputDown.add(function(){k.loadTexture(j.texture),l=!0,this.onDragStart.dispatch(m.apply(this))},this),k.events.onInputUp.add(function(){k.loadTexture(i.texture),l=!1,this.onDragStop.dispatch(m.apply(this))},this),this.container.root.game.input.addMoveCallback(function(a,b,f){if(l){var g=(this._vertical?f:b)-this.displayGroup[d];k.cameraOffset[d]=Math.min(c+e,Math.max(c,g-this.container.displayGroup[d])),this.onDrag.dispatch(m.apply(this))}},this),this.displayGroup.add(h),this.displayGroup.add(k),this.container.displayGroup.add(this.displayGroup)},Object.defineProperty(SlickUI.Element.Slider.prototype,"x",{get:function(){return this.displayGroup.x+this._x},set:function(a){this.displayGroup.x=a-this._x}}),Object.defineProperty(SlickUI.Element.Slider.prototype,"y",{get:function(){return this.displayGroup.y+this._y},set:function(a){this.displayGroup.y=a-this._y}}),Object.defineProperty(SlickUI.Element.Slider.prototype,"alpha",{get:function(){return this.displayGroup.alpha},set:function(a){this.displayGroup.alpha=a}}),Object.defineProperty(SlickUI.Element.Slider.prototype,"visible",{get:function(){return this.displayGroup.visible},set:function(a){this.displayGroup.visible=a}}),SlickUI.namespace("Element"),SlickUI.Element.Text=function(a,b,c,d,e,f,g){this._x=a,this._y=b,this._value=c,this.width=f,this.height=g,this.font=e,this.size=d,this.container=null},SlickUI.Element.Text.prototype.setContainer=function(a){this.container=a,"undefined"==typeof this.width&&(this.width=this.container.root.game.width),"undefined"==typeof this.height&&(this.height=this.container.root.game.height),"undefined"==typeof this.size&&(this.size=16)},SlickUI.Element.Text.prototype.reset=function(a,b,c){var d,e;d=Math.min(this.container.width-a,this.width),e=Math.min(this.container.height-b,this.height),"undefined"!=typeof this.text&&(c===!1&&(d=this.text.maxWidth,e=this.text.maxHeight),this.text.destroy()),a+=this.container.x,b+=this.container.y,this.text=this.container.root.game.make.bitmapText(a,b,this.font,this._value,this.size),this.text.maxWidth=d,this.text.maxHeight=e,this.container.displayGroup.add(this.text),this.text.fixedToCamera=!0},SlickUI.Element.Text.prototype.init=function(){var a=this.container.root.game.cache.getJSON("slick-ui-theme");"undefined"==typeof this.font&&(this.font=Object.keys(a.fonts)[Object.keys(a.fonts).length-1]),this.reset(this._x,this._y)},SlickUI.Element.Text.prototype.centerHorizontally=function(){return this.text.cameraOffset.x=this.text.maxWidth/2-this.text.width/2+this.container.x,this},SlickUI.Element.Text.prototype.centerVertically=function(){var a=this.container.root.game.cache.getJSON("slick-ui-theme");return this.text.cameraOffset.y=this.container.height/2-this.text.height/2-Math.round(a.button["border-y"]/2)+this.container.y,this},SlickUI.Element.Text.prototype.center=function(){return this.centerHorizontally(),this.centerVertically(),this},Object.defineProperty(SlickUI.Element.Text.prototype,"x",{get:function(){return this.text.cameraOffset.x-this.container.x},set:function(a){this.text.cameraOffset.x=a+this.container.x}}),Object.defineProperty(SlickUI.Element.Text.prototype,"y",{get:function(){return this.text.cameraOffset.y-this.container.y},set:function(a){this.text.cameraOffset.y=a+this.container.y}}),Object.defineProperty(SlickUI.Element.Text.prototype,"alpha",{get:function(){return this.text.alpha},set:function(a){this.text.alpha=a}}),Object.defineProperty(SlickUI.Element.Text.prototype,"visible",{get:function(){return this.text.visible},set:function(a){this.text.visible=a}}),Object.defineProperty(SlickUI.Element.Text.prototype,"value",{get:function(){return this.text.text},set:function(a){this.text.text=a}}),SlickUI.namespace("Element"),SlickUI.Element.TextField=function(a,b,c,d,e){"undefined"==typeof e&&(e=7),this._x=a,this._y=b,this._offsetX=a,this._offsetY=b,this._width=c,this._height=d,this.maxChars=e,this.container=null,this.value="",this.events={onOK:new Phaser.Signal,onToggle:new Phaser.Signal,onKeyPress:new Phaser.Signal}},SlickUI.Element.TextField.prototype.setContainer=function(a){this.container=new SlickUI.Container.Container(a)},SlickUI.Element.TextField.prototype.init=function(){var a=this.container.root.game.cache.getJSON("slick-ui-theme"),b=this.container.x=this.container.parent.x+this._x,c=this.container.y=this.container.parent.y+this._y,d=this.container.width=Math.min(this.container.parent.width-this._x,this._width),e=this.container.height=Math.min(this.container.parent.height-this._y,this._height);this.container.x+=Math.round(a.text_field["border-x"]/2),this.container.y+=Math.round(a.text_field["border-y"]/2),this.container.width-=a.text_field["border-x"],this.container.height-=a.text_field["border-y"],this.sprite=this.container.root.game.make.sprite(b,c,this.container.root.getRenderer("text_field").render(d,e).texture),this.sprite.inputEnabled=!0,this.sprite.input.useHandCursor=!0,this.container.displayGroup.add(this.sprite),this.sprite.x=b,this.sprite.y=c,this._offsetX=b,this._offsetY=c,this.sprite.fixedToCamera=!0;var f=!1;this.sprite.events.onInputOver.add(function(){f=!0},this),this.sprite.events.onInputOut.add(function(){f=!1},this);var g=new SlickUI.Keyboard.Keyboard(this.container.root,Object.keys(a.fonts)[Object.keys(a.fonts).length-1]);g.group.cameraOffset.y=this.container.root.game.height,g.group.visible=!1;var h=!1;this.sprite.events.onInputDown.add(function(){h||(h=!0,g.group.visible?(this.container.root.game.add.tween(g.group.cameraOffset).to({y:this.container.root.game.height},500,Phaser.Easing.Exponential.Out,!0).onComplete.add(function(){h=!1,g.group.visible=!1}),this.events.onToggle.dispatch(!1)):(g.group.visible=!0,this.container.root.game.add.tween(g.group.cameraOffset).to({y:this.container.root.game.height-g.height},500,Phaser.Easing.Exponential.Out,!0).onComplete.add(function(){h=!1}),this.events.onToggle.dispatch(!0)))},this),this.text=this.add(new SlickUI.Element.Text(8,0,"A")),this.text.centerVertically(),this.text.text.text=this.value,g.events.onKeyPress.add(function(a){"DEL"==a?this.value=this.value.substr(0,this.value.length-1):this.value=(this.value+a).substr(0,this.maxChars),this.text.text.text=this.value,this.events.onKeyPress.dispatch(a)},this),g.events.onOK.add(function(){this.sprite.events.onInputDown.dispatch(),this.events.onOK.dispatch()},this)},SlickUI.Element.TextField.prototype.add=function(a){return this.container.add(a)},Object.defineProperty(SlickUI.Element.TextField.prototype,"x",{get:function(){return this._x-this.container.parent.x},set:function(a){this._x=a,this.container.displayGroup.x=this.container.parent.x+a-this._offsetX}}),Object.defineProperty(SlickUI.Element.TextField.prototype,"y",{get:function(){return this._y-this.container.parent.y},set:function(a){this._y=a,this.container.displayGroup.y=this.container.parent.y+a-this._offsetY}}),Object.defineProperty(SlickUI.Element.TextField.prototype,"visible",{get:function(){return this.container.displayGroup.visible},set:function(a){this.container.displayGroup.visible=a}}),Object.defineProperty(SlickUI.Element.TextField.prototype,"alpha",{get:function(){return this.container.displayGroup.alpha},set:function(a){this.container.displayGroup.alpha=a}}),Object.defineProperty(SlickUI.Element.TextField.prototype,"width",{get:function(){return this.container.width},set:function(a){var b=this.container.root.game.cache.getJSON("slick-ui-theme");this._width=Math.round(a+b.text_field["border-x"]),this.sprite.destroy(),this.init(),this.container.displayGroup.sendToBack(this.sprite)}}),Object.defineProperty(SlickUI.Element.TextField.prototype,"height",{get:function(){return this.container.height},set:function(a){var b=this.container.root.game.cache.getJSON("slick-ui-theme");this._height=Math.round(a+b.text_field["border-y"]),this.sprite.destroy(),this.init(),this.container.displayGroup.sendToBack(this.sprite)}}),SlickUI.namespace("Keyboard"),SlickUI.Keyboard.Key=function(a,b,c,d,e,f,g,h){this.group=a.game.add.group(),this.font=f,this._x=b,this._y=c,this.plugin=a,this._width=d,this._height=e,this.fontSize=g,this.text=h},SlickUI.Keyboard.Key.prototype.init=function(){var a=this.plugin.getRenderer("key").render(this._width,this._height),b=a[0],c=a[1],d=this.plugin.game.make.sprite(this._x,this._y,b.texture),e=!1;d.inputEnabled=!0,d.input.useHandCursor=!0,d.events.onInputDown.add(function(){d.loadTexture(c.texture)}),d.events.onInputUp.add(function(){d.loadTexture(b.texture),e||d.events.onInputUp.halt()}),d.events.onInputOver.add(function(){e=!0},this),d.events.onInputOut.add(function(){e=!1},this);var f=this.plugin.game.make.bitmapText(this._x,this._y,this.font,this.text,this.fontSize);f.x+=this._width/2-f.width/2,f.y+=this._height/2-this.fontSize/2-4,this.group.add(d),this.group.add(f),this.events=d.events},SlickUI.namespace("Keyboard"),SlickUI.Keyboard.Keyboard=function(a,b,c,d){this.group=a.game.add.group(),this.keyGroupLower=a.game.make.group(),this.keyGroupUpper=a.game.make.group(),this.keyGroupCurrent=this.keyGroupLower,this.keyGroupUpper.visible=!1,this.group.fixedToCamera=!0,this.font=b,this.plugin=a,this.fontSize=c,this.height=160,this.events={onKeyPress:new Phaser.Signal,onOK:new Phaser.Signal},"undefined"==typeof c&&(this.fontSize=16),!1!==d&&this.create()},SlickUI.Keyboard.Keyboard.prototype.create=function(){var a=this.plugin.getRenderer("keyboard").render(this.height);this.group.add(a),this.group.add(this.keyGroupLower),this.group.add(this.keyGroupUpper);var b=440,c=Math.round(this.plugin.game.width/2-b/2);this.addKey(new SlickUI.Keyboard.Key(this.plugin,c,16,32,32,this.font,this.fontSize,"1"),this.group),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+36,16,32,32,this.font,this.fontSize,"2"),this.group),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+72,16,32,32,this.font,this.fontSize,"3"),this.group), this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+108,16,32,32,this.font,this.fontSize,"4"),this.group),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+144,16,32,32,this.font,this.fontSize,"5"),this.group),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+180,16,32,32,this.font,this.fontSize,"6"),this.group),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+216,16,32,32,this.font,this.fontSize,"7"),this.group),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+252,16,32,32,this.font,this.fontSize,"8"),this.group),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+288,16,32,32,this.font,this.fontSize,"9"),this.group),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+324,16,32,32,this.font,this.fontSize,"0"),this.group),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+360,16,64,32,this.font,this.fontSize,"DEL"),this.group),c+=16,this.addKey(new SlickUI.Keyboard.Key(this.plugin,c,52,32,32,this.font,this.fontSize,"q")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+36,52,32,32,this.font,this.fontSize,"w")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+72,52,32,32,this.font,this.fontSize,"e")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+108,52,32,32,this.font,this.fontSize,"r")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+144,52,32,32,this.font,this.fontSize,"t")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+180,52,32,32,this.font,this.fontSize,"y")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+216,52,32,32,this.font,this.fontSize,"u")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+252,52,32,32,this.font,this.fontSize,"i")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+288,52,32,32,this.font,this.fontSize,"o")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+324,52,32,32,this.font,this.fontSize,"p")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+360,52,32,32,this.font,this.fontSize,"!"),this.group),c+=16,this.addKey(new SlickUI.Keyboard.Key(this.plugin,c,88,32,32,this.font,this.fontSize,"a")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+36,88,32,32,this.font,this.fontSize,"s")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+72,88,32,32,this.font,this.fontSize,"d")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+108,88,32,32,this.font,this.fontSize,"f")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+144,88,32,32,this.font,this.fontSize,"g")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+180,88,32,32,this.font,this.fontSize,"h")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+216,88,32,32,this.font,this.fontSize,"j")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+252,88,32,32,this.font,this.fontSize,"k")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+288,88,32,32,this.font,this.fontSize,"l")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+324,88,80,32,this.font,this.fontSize,"UPPER")),c+=16,this.addKey(new SlickUI.Keyboard.Key(this.plugin,c-40,124,36,32,this.font,this.fontSize,"OK"),this.group),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c,124,32,32,this.font,this.fontSize,"z")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+36,124,32,32,this.font,this.fontSize,"x")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+72,124,32,32,this.font,this.fontSize,"c")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+108,124,32,32,this.font,this.fontSize,"v")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+144,124,32,32,this.font,this.fontSize,"b")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+180,124,32,32,this.font,this.fontSize,"n")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+216,124,32,32,this.font,this.fontSize,"m")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+252,124,32,32,this.font,this.fontSize,","),this.group),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+288,124,32,32,this.font,this.fontSize,"."),this.group),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+324,124,32,32,this.font,this.fontSize," "),this.group),c-=32,this.keyGroupCurrent=this.keyGroupUpper,this.addKey(new SlickUI.Keyboard.Key(this.plugin,c,52,32,32,this.font,this.fontSize,"Q")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+36,52,32,32,this.font,this.fontSize,"W")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+72,52,32,32,this.font,this.fontSize,"E")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+108,52,32,32,this.font,this.fontSize,"R")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+144,52,32,32,this.font,this.fontSize,"T")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+180,52,32,32,this.font,this.fontSize,"Y")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+216,52,32,32,this.font,this.fontSize,"U")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+252,52,32,32,this.font,this.fontSize,"I")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+288,52,32,32,this.font,this.fontSize,"O")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+324,52,32,32,this.font,this.fontSize,"P")),c+=16,this.addKey(new SlickUI.Keyboard.Key(this.plugin,c,88,32,32,this.font,this.fontSize,"A")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+36,88,32,32,this.font,this.fontSize,"S")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+72,88,32,32,this.font,this.fontSize,"D")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+108,88,32,32,this.font,this.fontSize,"F")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+144,88,32,32,this.font,this.fontSize,"G")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+180,88,32,32,this.font,this.fontSize,"H")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+216,88,32,32,this.font,this.fontSize,"J")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+252,88,32,32,this.font,this.fontSize,"K")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+288,88,32,32,this.font,this.fontSize,"L")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+324,88,80,32,this.font,this.fontSize,"lower")),c+=16,this.addKey(new SlickUI.Keyboard.Key(this.plugin,c,124,32,32,this.font,this.fontSize,"Z")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+36,124,32,32,this.font,this.fontSize,"X")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+72,124,32,32,this.font,this.fontSize,"C")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+108,124,32,32,this.font,this.fontSize,"V")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+144,124,32,32,this.font,this.fontSize,"B")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+180,124,32,32,this.font,this.fontSize,"N")),this.addKey(new SlickUI.Keyboard.Key(this.plugin,c+216,124,32,32,this.font,this.fontSize,"M"))},SlickUI.Keyboard.Keyboard.prototype.addKey=function(a,b){a.init(),"undefined"==typeof b&&(b=this.keyGroupCurrent),b.add(a.group),a.events.onInputUp.add(function(){return"UPPER"==a.text||"lower"==a.text?void this.toggleMode():"OK"==a.text?void this.events.onOK.dispatch():void this.events.onKeyPress.dispatch(a.text)},this)},SlickUI.Keyboard.Keyboard.prototype.toggleMode=function(){this.keyGroupUpper.visible=!this.keyGroupUpper.visible,this.keyGroupLower.visible=!this.keyGroupLower.visible};

})();

