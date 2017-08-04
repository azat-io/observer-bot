'use strict'

import fs from 'fs'

/**
 * Считывает содержимое Markdown документа, располагающегося в директории
 * "content" текущего проекта
 *
 * @param   { string } md - Название Markdown документа без указания расширения
 *                          файла
 *
 * @returns { string }    - Содержимое документа
 */
export default function readMD (md) {
    return fs.readFileSync(`${ process.cwd() }/content/${ md }.md`)
}
