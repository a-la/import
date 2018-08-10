// standard
import aLaMode from 'alamode'
import ALaImport from '@a-la/import'
import App from "koa"

import { methodA, methodB } from '@a-la/named-import'

/*expected*/
let aLaMode = require('alamode'); if (aLaMode && aLaMode.__esModule) aLaMode = aLaMode.default;
let ALaImport = require('@a-la/import'); if (ALaImport && ALaImport.__esModule) ALaImport = ALaImport.default;
let App = require("koa"); if (App && App.__esModule) App = App.default;

const { methodA, methodB } = require('@a-la/named-import')
/**/

// default and named
import def, { methodA, methodB } from 'test'

/*expected*/
let def = require('test'); if (def && def.__esModule) def = def.default;
const { methodA, methodB } = def
/**/