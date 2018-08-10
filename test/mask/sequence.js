// standard
import aLaMode from 'alamode'
import ALaImport from '@a-la/import'
import App from "koa"

import { methodA, methodB } from '@a-la/named-import'

/*expected*/
const aLaMode = require('alamode')
const ALaImport = require('@a-la/import')
const App = require("koa")

const { methodA, methodB } = require('@a-la/named-import')
/**/

// default and named
import def, { methodA, methodB } from 'test'

/*expected*/
let def = require('test'); if (def && def.__esModule) def = test.default
const { methodA, methodB } = def
/**/