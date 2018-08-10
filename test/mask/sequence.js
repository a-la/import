// standard
import aLaMode from 'alamode'
import ALaImport from '@a-la/import'
import App from 'koa'

import { methodA, methodB } from '@a-la/named-import'

/*expected*/
const aLaMode = require('alamode')
const ALaImport = require('@a-la/import')
const App = require('koa')

const { methodA, methodB } = require('@a-la/named-import')
/**/
