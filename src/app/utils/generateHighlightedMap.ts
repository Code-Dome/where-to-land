import {LocationInfo} from "@/app/types/Location";

export async function generateHighlightedMap(randomizedLocation: string) {
    // Load the original map image
    const mapImage = new Image();
    mapImage.src = "/fortnite_map.png"; // Ensure the path matches your file structure
    await new Promise((resolve) => {
        mapImage.onload = resolve;
    });

    // Create a canvas and draw the grayscale map
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = mapImage.width;
    canvas.height = mapImage.height;

    // Draw the grayscale map
    ctx.drawImage(mapImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
        imageData.data[i] = avg; // Red
        imageData.data[i + 1] = avg; // Green
        imageData.data[i + 2] = avg; // Blue
    }
    ctx.putImageData(imageData, 0, 0);

    // Highlight the selected location as a polygon
    const polygon = getLocationPolygon(randomizedLocation);
    if (polygon) {
        // Draw the polygon with a black stroke
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(polygon[0].x, polygon[0].y); // Move to the first vertex
        for (let i = 1; i < polygon.length; i++) {
            ctx.lineTo(polygon[i].x, polygon[i].y); // Draw lines to other vertices
        }
        ctx.closePath();

        // Stroke the outline
        ctx.lineWidth = 3; // Set stroke width
        ctx.strokeStyle = "black"; // Set stroke color
        ctx.stroke();

        // Fill the polygon with the original colors
        ctx.clip();
        ctx.drawImage(mapImage, 0, 0);
        ctx.restore();
    }

    // Return the canvas as a data URL
    return canvas.toDataURL();
}
// Example function to return polygon coordinates for each location
function getLocationPolygon(location: string): { x: number; y: number }[] | null {
    const polygons: LocationInfo = {
        "Twinkle Terrace": [
            { x: 278, y: 222 },
            { x: 287, y: 200 },
            { x: 294, y: 191 },
            { x: 295, y: 190 },
            { x: 310, y: 184 },
            { x: 316, y: 182 },
            { x: 324, y: 182 },
            { x: 358, y: 198 },
            { x: 361, y: 201 },
            { x: 367, y: 208 },
            { x: 369, y: 211 },
            { x: 370, y: 213 },
            { x: 372, y: 218 },
            { x: 371, y: 222 },
            { x: 370, y: 224 },
            { x: 364, y: 230 },
            { x: 314, y: 256 },
            { x: 308, y: 259 },
            { x: 303, y: 259 },
            { x: 283, y: 257 },
            { x: 280, y: 256 },
            { x: 276, y: 252 },
            { x: 274, y: 249 },
            { x: 274, y: 247 },
            { x: 276, y: 234 },
        ],"Nightshift Forest": [
            { x: 393, y: 240 },
            { x: 394, y: 241 },
            { x: 404, y: 253 },
            { x: 405, y: 259 },
            { x: 405, y: 278 },
            { x: 404, y: 285 },
            { x: 403, y: 288 },
            { x: 378, y: 321 },
            { x: 376, y: 323 },
            { x: 334, y: 349 },
            { x: 318, y: 358 },
            { x: 304, y: 365 },
            { x: 303, y: 365 },
            { x: 268, y: 353 },
            { x: 266, y: 352 },
            { x: 250, y: 341 },
            { x: 249, y: 340 },
            { x: 234, y: 323 },
            { x: 233, y: 321 },
            { x: 232, y: 317 },
            { x: 229, y: 264 },
            { x: 229, y: 262 },
            { x: 230, y: 259 },
            { x: 234, y: 254 },
            { x: 235, y: 253 },
        ],"Whiffy Wharf": [
            { x: 340, y: 46 },
            { x: 349, y: 67 },
            { x: 349, y: 72 },
            { x: 339, y: 145 },
            { x: 338, y: 148 },
            { x: 326, y: 174 },
            { x: 324, y: 178 },
            { x: 322, y: 180 },
            { x: 281, y: 217 },
            { x: 280, y: 217 },
            { x: 279, y: 216 },
            { x: 262, y: 196 },
            { x: 247, y: 175 },
            { x: 243, y: 137 },
            { x: 242, y: 132 },
            { x: 242, y: 129 },
            { x: 243, y: 117 },
            { x: 247, y: 109 },
            { x: 302, y: 40 },
            { x: 303, y: 39 },
            { x: 305, y: 39 },
            { x: 338, y: 45 }
        ],"Lost Lake": [
            { x: 326, y: 178 },
            { x: 335, y: 83 },
            { x: 340, y: 72 },
            { x: 341, y: 71 },
            { x: 370, y: 70 },
            { x: 376, y: 70 },
            { x: 397, y: 74 },
            { x: 401, y: 75 },
            { x: 403, y: 76 },
            { x: 510, y: 158 },
            { x: 512, y: 160 },
            { x: 519, y: 170 },
            { x: 519, y: 178 },
            { x: 517, y: 230 },
            { x: 516, y: 236 },
            { x: 513, y: 253 },
            { x: 511, y: 255 },
            { x: 509, y: 256 },
            { x: 425, y: 268 },
            { x: 407, y: 269 },
            { x: 406, y: 269 },
            { x: 330, y: 185 },
            { x: 326, y: 179 }
        ],"Flooded Frogs": [
            { x: 484, y: 20 },
            { x: 526, y: 28 },
            { x: 527, y: 29 },
            { x: 548, y: 69 },
            { x: 549, y: 72 },
            { x: 549, y: 73 },
            { x: 547, y: 75 },
            { x: 491, y: 112 },
            { x: 488, y: 113 },
            { x: 457, y: 121 },
            { x: 427, y: 110 },
            { x: 350, y: 72 },
            { x: 349, y: 71 },
            { x: 342, y: 48 },
            { x: 342, y: 46 },
            { x: 351, y: 44 },
            { x: 431, y: 27 },
            { x: 483, y: 20 },
        ],"Magic Mosses": [
            { x: 460, y: 123 },
            { x: 527, y: 45 },
            { x: 529, y: 43 },
            { x: 557, y: 20 },
            { x: 562, y: 17 },
            { x: 568, y: 19 },
            { x: 599, y: 30 },
            { x: 603, y: 32 },
            { x: 604, y: 33 },
            { x: 610, y: 93 },
            { x: 610, y: 104 },
            { x: 608, y: 122 },
            { x: 575, y: 167 },
            { x: 572, y: 171 },
            { x: 570, y: 172 },
            { x: 567, y: 172 },
            { x: 526, y: 166 },
            { x: 474, y: 150 },
            { x: 465, y: 145 },
            { x: 462, y: 142 },
            { x: 461, y: 139 },
            { x: 460, y: 130 },
        ],"Pumped Power": [
            { x: 656, y: 56 },
            { x: 657, y: 166 },
            { x: 657, y: 169 },
            { x: 655, y: 180 },
            { x: 653, y: 184 },
            { x: 645, y: 197 },
            { x: 644, y: 198 },
            { x: 634, y: 204 },
            { x: 630, y: 204 },
            { x: 611, y: 200 },
            { x: 582, y: 180 },
            { x: 574, y: 174 },
            { x: 586, y: 59 },
            { x: 588, y: 49 },
            { x: 602, y: 25 },
            { x: 603, y: 24 },
            { x: 630, y: 13 },
            { x: 635, y: 12 },
            { x: 639, y: 12 },
            { x: 643, y: 20 },
        ],"Demon's Dojo": [
            { x: 761, y: 48 },
            { x: 787, y: 158 },
            { x: 787, y: 159 },
            { x: 786, y: 164 },
            { x: 784, y: 168 },
            { x: 746, y: 233 },
            { x: 745, y: 234 },
            { x: 709, y: 226 },
            { x: 701, y: 224 },
            { x: 663, y: 209 },
            { x: 661, y: 208 },
            { x: 655, y: 203 },
            { x: 653, y: 201 },
            { x: 649, y: 196 },
            { x: 623, y: 99 },
            { x: 622, y: 91 },
            { x: 622, y: 87 },
            { x: 623, y: 85 },
            { x: 625, y: 82 },
            { x: 634, y: 71 },
            { x: 640, y: 65 },
            { x: 656, y: 50 },
            { x: 668, y: 40 },
            { x: 716, y: 5 },
            { x: 718, y: 4 },
            { x: 739, y: 14 },
            { x: 740, y: 15 },
            { x: 749, y: 25 },
        ],"Brutal Boxcars": [
            { x: 514, y: 259 },
            { x: 489, y: 207 },
            { x: 519, y: 168 },
            { x: 521, y: 166 },
            { x: 537, y: 162 },
            { x: 540, y: 162 },
            { x: 545, y: 163 },
            { x: 576, y: 178 },
            { x: 596, y: 189 },
            { x: 599, y: 191 },
            { x: 615, y: 203 },
            { x: 618, y: 209 },
            { x: 619, y: 242 },
            { x: 619, y: 243 },
            { x: 617, y: 263 },
            { x: 615, y: 267 },
            { x: 570, y: 291 },
            { x: 566, y: 293 },
            { x: 561, y: 295 },
            { x: 549, y: 295 },
            { x: 545, y: 294 },
            { x: 534, y: 287 },
            { x: 533, y: 286 },
        ],"Burd": [
            {x: 220, y: 360},
            {x: 339, y: 360},
            {x: 346, y: 370},
            {x: 350, y: 376},
            {x: 357, y: 388},
            {x: 359, y: 394},
            {x: 360, y: 442},
            {x: 360, y: 443},
            {x: 358, y: 448},
            {x: 278, y: 445},
            {x: 262, y: 445},
            {x: 222, y: 429}
        ],
        "Shogun's Solitude": [
            {x: 239, y: 529},
            {x: 259, y: 475},
            {x: 282, y: 423},
            {x: 328, y: 428},
            {x: 350, y: 438},
            {x: 350, y: 511},
            {x: 338, y: 544},
            {x: 336, y: 546},
            {x: 278, y: 530},
            {x: 264, y: 530},
            {x: 252, y: 546},
            {x: 245, y: 542},
            {x: 241, y: 539},
            {x: 240, y: 538},
            {x: 239, y: 533}
        ],
        "Warrior's Watch" : [
            {x: 408, y: 310},
            {x: 420, y: 340},
            {x: 420, y: 402},
            {x: 418, y: 406},
            {x: 415, y: 409},
            {x: 411, y: 410},
            {x: 351, y: 410},
            {x: 333, y: 354},
            {x: 333, y: 339},
            {x: 380, y: 310}
        ],
        "Foxy Floodgate" : [
            {x: 548, y: 251},
            {x: 560, y: 294},
            {x: 560, y: 345},
            {x: 544, y: 370},
            {x: 542, y: 372},
            {x: 516, y: 381},
            {x: 507, y: 383},
            {x: 502, y: 384},
            {x: 496, y: 384},
            {x: 440, y: 381},
            {x: 434, y: 380},
            {x: 427, y: 378},
            {x: 424, y: 377},
            {x: 422, y: 376},
            {x: 400, y: 351},
            {x: 400, y: 287},
            {x: 402, y: 271},
            {x: 409, y: 264},
            {x: 412, y: 263},
            {x: 448, y: 258},
            {x: 492, y: 254}
        ],
        "Canyon Crossing": [
            {x: 350, y: 550},
            {x: 350, y: 419},
            {x: 352, y: 417},
            {x: 386, y: 397},
            {x: 421, y: 380},
            {x: 518, y: 380},
            {x: 519, y: 383},
            {x: 520, y: 393},
            {x: 520, y: 511},
            {x: 514, y: 543},
            {x: 512, y: 545},
            {x: 493, y: 550}
        ],
        "Shining Span" : [{x: 745, y: 221},
            {x: 773, y: 286},
            {x: 776, y: 348},
            {x: 779, y: 414},
            {x: 779, y: 416},
            {x: 774, y: 422},
            {x: 770, y: 426},
            {x: 753, y: 429},
            {x: 749, y: 429},
            {x: 711, y: 420},
            {x: 703, y: 416},
            {x: 702, y: 415},
            {x: 633, y: 330},
            {x: 632, y: 327},
            {x: 630, y: 301},
            {x: 630, y: 205},
            {x: 639, y: 200},
            {x: 653, y: 200},
            {x: 744, y: 220}
        ],
        "Masked Meadows": [
            {x: 620, y: 431},
            {x: 620, y: 490},
            {x: 617, y: 491},
            {x: 478, y: 529},
            {x: 494, y: 457},
            {x: 496, y: 451},
            {x: 529, y: 402},
            {x: 531, y: 400},
            {x: 593, y: 400},
            {x: 594, y: 401},
            {x: 608, y: 416}
        ],
        "Seaport City": [
            {x: 680, y: 302},
            {x: 680, y: 421},
            {x: 614, y: 458},
            {x: 569, y: 460},
            {x: 556, y: 457},
            {x: 552, y: 453},
            {x: 550, y: 393},
            {x: 550, y: 400},
            {x: 561, y: 300},
            {x: 640, y: 300}
        ],
        "Hopeful Heights": [
            {x: 530, y: 552},
            {x: 530, y: 501},
            {x: 533, y: 455},
            {x: 534, y: 454},
            {x: 622, y: 433},
            {x: 643, y: 430},
            {x: 752, y: 430},
            {x: 754, y: 434},
            {x: 755, y: 444},
            {x: 756, y: 487},
            {x: 756, y: 488},
            {x: 755, y: 494},
            {x: 745, y: 531},
            {x: 742, y: 538},
            {x: 739, y: 544},
            {x: 735, y: 548},
            {x: 729, y: 551},
            {x: 719, y: 554},
            {x: 599, y: 570},
            {x: 590, y: 571},
            {x: 589, y: 571},
            {x: 585, y: 570},
            {x: 532, y: 554}
        ]
    };
    return polygons[location] || null;
}
