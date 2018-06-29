package com.emcasa;

import android.app.Application;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.horcrux.svg.SvgPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  @Override
  protected ReactNativeHost createReactNativeHost() {
    return new NavigationReactNativeHost(this) {
      @Override
      protected String getJSMainModuleName() {
        return "index";
      }
    };
  }

	@Override
	public boolean isDebug() {
		return BuildConfig.DEBUG;
	}

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new RNFirebasePackage(),
      new RNFirebaseMessagingPackage(),
      new ImagePickerPackage(),
      new SvgPackage(),
      new PhotoViewPackage(),
      new MapsPackage()
    );
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    Fabric.with(this, new Crashlytics());
  }
}
