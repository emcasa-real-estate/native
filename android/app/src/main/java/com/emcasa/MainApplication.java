package com.emcasa;

import android.app.Application;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.horcrux.svg.SvgPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.smixx.fabric.FabricPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import com.smixx.fabric.FabricPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
	@Override
	public boolean isDebug() {
		return BuildConfig.DEBUG;
	}

  @Override
  protected String getJSMainModuleName() {
    return "index";
  }

  @Override
  protected List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new ImagePickerPackage(),
        new SvgPackage(),
        new OrientationPackage(),
        new PhotoViewPackage(),
        new MapsPackage(),
        new FabricPackage()
    );
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    Fabric.with(this, new Crashlytics());
  }
}
