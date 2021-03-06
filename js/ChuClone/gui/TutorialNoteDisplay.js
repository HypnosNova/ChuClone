(function(){
	var partial_html = "<div class='push_3 grid_6' style='margin-left: 20px; margin-top:30px;'>  										\
		<p class='jura_48' style='color:#01b0ee; text-align:center;'>Tutorial</p>                                  				\
		<div class='clear'></div>                                                                      									\
		<div class='grid_6 grayBorder jura_24' style='background-color: rgba(255,255,255, 0.75);'>#{note}</div>                                                                								\
	</div>";

	ChuClone.namespace("ChuClone.gui");

	var htmlElement = null;
	var gameContainer = null;
	ChuClone.gui.TutorialNoteDisplay = {
		noteText: null,

		show: function(noteText) {
			this.noteText = noteText;
			if( htmlElement ) {
				this.destroy( true );
			}

			// Welcome to ChuClone.<br><br>Use <strong>WASD</strong> to move Chu around.
			// Now we're moving.<br><br>Dont forget to move the camera with the mouse.
			// <strong>Thats the stuff!</strong><br><span class="jura_18">Now lets get some speed!<br>Chu all about speed.<br>The wind in Chu's perfectly aerodynamic body.</span>
			// See that <strong>green</strong> block over there?<br><strong>Touch</strong> it to complete the level!

			// <strong>Major Air!</strong>Lets try a PeakJump</strong><br>span class="jura_18">Jump at the peak of being launched for a extra lift</span>
			// <strong>Nice!</strong><br>Chu loves to get air.
			// <strong>Checkpoint!</strong><br>Now Chu can restart from this location
			// <strong>Ouch!</strong><br>This will kill Chu
			var partial = partial_html.replace("#{note}", noteText);

			// Reference to games htmlElement
			gameContainer = document.getElementById('gameContainer');

			// Where we will place our recap div
			htmlElement = document.createElement("div");
			htmlElement.innerHTML = partial;
			htmlElement.id = 'level_recap'
			htmlElement.setAttribute('class', 'container_12');
			htmlElement.setAttribute('style', 'margin-left:20px');
			htmlElement.style.position = "absolute";
			htmlElement.style.zIndex = "2";
			htmlElement.tabIndex = 1;


			if( ChuClone.GameViewController.INSTANCE.getFullscreen() ) {
				htmlElement.style.top = gameContainer.offsetTop + 150 + "px";
				htmlElement.style.left = gameContainer.offsetLeft + (gameContainer.clientWidth/2) - 290  + "px";
			} else {
				htmlElement.style.top = gameContainer.offsetTop + "px";
				htmlElement.style.left = gameContainer.offsetLeft + "px";
			}


			htmlElement.style.opacity = 0;
			htmlElement.style.cursor = "pointer";

			// Center if not inside of a div
			if(gameContainer.parentNode.tagName === "BODY") {
				// Container width - 960/2 (960 comes from the fact that we're using grid960 css)
				htmlElement.style.left = (gameContainer.parentNode.offsetWidth/2-480) + "px";
				htmlElement.style.marginLeft = "0px";

				// No need to display stats
				htmlElement.firstChild.removeChild( htmlElement.firstChild.children[7] );
			}


			//console.log(htmlElement.children)

			// FADE IN
			new TWEEN.Tween({opacity:0})
				.to({opacity: 1}, 800)
				.easing( TWEEN.Easing.Sinusoidal.EaseIn )
				.onUpdate( function(){ if(htmlElement) htmlElement.style.opacity = this.opacity; })
				.start();


			// Animate the children from below
			ChuClone.utils.animateChildrenInFromBelow( htmlElement.firstChild );
			ChuClone.utils.animateChildrenInFromBelow( htmlElement.firstChild.lastChild.previousSibling ); // Strange way of getting the level_stats div, cus last real one is a textnode
			gameContainer.parentNode.insertBefore(htmlElement, gameContainer);


			htmlElement.focus();
			var that = this;
			this._callback = function(e){
				if( e.type == 'mousedown' ) {
					that.fadeOutAndDestroy( noteText );
				}
                e.stopPropagation();
            };

            window.addEventListener('mousedown', this._callback, false);
			ChuClone.DOM_ELEMENT.tabIndex = 0;
					ChuClone.DOM_ELEMENT.focus();
            //ChuClone.DOM_ELEMENT.addEventListener('keydown', this._callback, false);
            //ChuClone.DOM_ELEMENT.addEventListener('keyup', this._callback, false);

		},


		/**
		 * Fade out the TutorialNote and call destroy on complete
		 */
		fadeOutAndDestroy: function( noteText ) {
			var that = this;

			if(this.tween) {
				TWEEN.remove( this.tween );
				this.tween = null;
			}

			this.tween = new TWEEN.Tween({opacity:1})
					.to({opacity: 0}, 200)
					.easing(TWEEN.Easing.Sinusoidal.EaseIn)
					.onUpdate(function() { if(htmlElement) htmlElement.style.opacity = this.opacity; })
					.onComplete(function() { that.destroy( noteText ) })
					.start();
		},

		/**
		 * Removes the HTMLElement from the DOM
		 */
		destroy: function( noteText ) {
			if(!htmlElement) return;

			window.removeEventListener('mousedown', this._callback);
            //ChuClone.DOM_ELEMENT.removeEventListener('keydown', this._callback);
            //ChuClone.DOM_ELEMENT.removeEventListener('keyup', this._callback);

			if(noteText == this.noteText)
				this.noteText = null;

			this._callback = null;
			htmlElement.parentNode.removeChild(htmlElement);
			htmlElement = null;


			setTimeout(function() {
				ChuClone.DOM_ELEMENT.tabIndex = 0;
				ChuClone.DOM_ELEMENT.focus();
			}, 100);
		}
	};
})();