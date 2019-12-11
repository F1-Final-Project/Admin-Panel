import * as configFile from '../pseudoEnv'

/**
 * @desc Конфигурация проэкта для запуска Push notification через firebase
 * Настройки проекта которые можно найти: Настройки проекта --> Ваши приложения(находится в низу настроек)
 * --> СДК ( в нем находятся ваши настройки)
 */

export const config = {
	apiKey: configFile.APIKEY,
	authDomain: configFile.AUTHDOMAIN,
	databaseURL: configFile.DATABASEURL,
	projectId: configFile.PROJECTID,
	storageBucket: configFile.STOREGEBUCKET,
	messagingSenderId: configFile.MESSAGINGSENDERID,
	appId: configFile.APPID,
}

