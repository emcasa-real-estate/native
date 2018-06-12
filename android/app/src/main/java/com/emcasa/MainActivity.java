package com.emcasa;

import android.content.Intent;
import android.content.res.Configuration;
import com.facebook.react.ReactActivity;
import com.smixx.fabric.FabricPackage;
import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }
}
