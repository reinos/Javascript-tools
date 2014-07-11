(function ( $ ) {
 
    $.fn.leaf = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            numberOfLeafs: 7, /* Define the number of leaves to be used in the animation */
            leafImage: "leaf.png"
        }, options );

        var obj = $(this);

        /* Fill the empty container with new leaves */
        for (var i = 0; i < settings.numberOfLeafs; i++)
        {
            obj.append(createALeaf(settings.leafImage));
        }
     
    };

    /*
     Receives the lowest and highest values of a range and
     returns a random integer that falls within that range.
     */
    function randomInteger(low, high) {
        return low + Math.floor(Math.random() * (high - low));
    }

    /*
     Receives the lowest and highest values of a range and
     returns a random float that falls within that range.
     */
    function randomFloat(low, high) {
        return low + Math.random() * (high - low);
    }

    /*
     Receives a number and returns its CSS pixel value.
     */
    function pixelValue(value) {
        return value + 'px';
    }

    /*
     Returns a duration value for the falling animation.
     */
    function durationValue(value) {
        return value + 's';
    }

    /*
     Uses an img element to create each leaf. "Leaves.css" implements two spin
     animations for the leaves: clockwiseSpin and counterclockwiseSpinAndFlip. This
     function determines which of these spin animations should be applied to each leaf.

     */
    function createALeaf(leafImage) {
        /* Start by creating a wrapper div, and an empty img element */
        var leafDiv = document.createElement('div');
        leafDiv.className = "leaf";
        var image = document.createElement('img');

        /* Randomly choose a leaf image and assign it to the newly created element */
        image.src = leafImage;

        leafDiv.style.top = "-100px";

        /* Position the leaf at a random location along the screen */
        leafDiv.style.left = pixelValue(randomInteger(0, (window.innerWidth - 200)));

        /* Randomly choose a spin animation */
        var spinAnimationName = (Math.random() < 90) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';

        /* Set the -webkit-animation-name property with these values */
        leafDiv.style.webkitAnimationName = 'fade, drop';
        image.style.webkitAnimationName = spinAnimationName;

        /* Set the -animation-name property with these values */
        leafDiv.style.animationName = 'fade, drop';
        image.style.animationName = spinAnimationName;

        /* Figure out a random duration for the fade and drop animations */
        var fadeAndDropDuration = durationValue(randomFloat(8, 20));

        /* Figure out another random duration for the spin animation */
        var spinDuration = durationValue(randomFloat(4, 10));
        /* Set the -webkit-animation-duration property with these values */
        leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

        /* Set the animation-duration property with these values */
        leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

        var leafDelay = durationValue(randomFloat(0, 0));
        leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

        image.style.webkitAnimationDuration = spinDuration;

        leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;

        image.style.animationDuration = spinDuration;

        // add the <img> to the <div>
        leafDiv.appendChild(image);

        /* Return this img element so it can be added to the document */
        return leafDiv;
    };
 
}( jQuery ));
