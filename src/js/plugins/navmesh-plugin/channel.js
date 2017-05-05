const utils = require("./utils");

class Channel {
    constructor() {
        this.portals = [];
    }

    push(p1, p2) {
        if (p2 === undefined) p2 = p1;
        this.portals.push({
            left: p1, right: p2
        });
    }

    stringPull() {
        var portals = this.portals;
        var pts = [];
        // Init scan state
        var portalApex, portalLeft, portalRight;
        var apexIndex = 0,
            leftIndex = 0,
            rightIndex = 0;

        portalApex = portals[0].left;
        portalLeft = portals[0].left;
        portalRight = portals[0].right;

        // Add start point.
        pts.push(portalApex);

        for (var i = 1; i < portals.length; i++) {
            var left = portals[i].left;
            var right = portals[i].right;

            // Update right vertex.
            if (utils.triarea2(portalApex, portalRight, right) <= 0.0) {
                if (portalApex.equals(portalRight) || utils.triarea2(portalApex, portalLeft, right) > 0.0) {
                    // Tighten the funnel.
                    portalRight = right;
                    rightIndex = i;
                } else {
                    // Right over left, insert left to path and restart scan from portal left point.
                    pts.push(portalLeft);
                    // Make current left the new apex.
                    portalApex = portalLeft;
                    apexIndex = leftIndex;
                    // Reset portal
                    portalLeft = portalApex;
                    portalRight = portalApex;
                    leftIndex = apexIndex;
                    rightIndex = apexIndex;
                    // Restart scan
                    i = apexIndex;
                    continue;
                }
            }

            // Update left vertex.
            if (utils.triarea2(portalApex, portalLeft, left) >= 0.0) {
                if (portalApex.equals(portalLeft) || utils.triarea2(portalApex, portalRight, left) < 0.0) {
                    // Tighten the funnel.
                    portalLeft = left;
                    leftIndex = i;
                } else {
                    // Left over right, insert right to path and restart scan from portal right point.
                    pts.push(portalRight);
                    // Make current right the new apex.
                    portalApex = portalRight;
                    apexIndex = rightIndex;
                    // Reset portal
                    portalLeft = portalApex;
                    portalRight = portalApex;
                    leftIndex = apexIndex;
                    rightIndex = apexIndex;
                    // Restart scan
                    i = apexIndex;
                    continue;
                }
            }
        }

        if ((pts.length === 0) || (!pts[pts.length - 1].equals(portals[portals.length - 1].left))) {
            // Append last point to path.
            pts.push(portals[portals.length - 1].left);
        }

        this.path = pts;
        return pts;
    }
}

module.exports = Channel;