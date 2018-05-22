#!/bin/sh
cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug
