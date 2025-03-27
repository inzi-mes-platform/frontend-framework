import React from 'react';

var BpmnViewer = require('bpmn-js').Viewer;

var xml; // my BPMN 2.0 xml
var viewer = new BpmnViewer({ container: 'body' });

viewer.importXML(xml, function(err) {

    if (err) {
      console.log('error rendering', err);
    } else {
      console.log('rendered');
    }
});
