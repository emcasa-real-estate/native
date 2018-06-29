package com.emcasa;

import android.content.Intent;
import android.content.res.Configuration;
import android.annotation.TargetApi;
import android.os.Build;
import android.support.annotation.Nullable;
import android.support.annotation.NonNull;

import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity implements PermissionAwareActivity {
    @Nullable
    private PermissionListener permissionListener;

    @TargetApi(Build.VERSION_CODES.M)
    public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
        permissionListener = listener;
        requestPermissions(permissions, requestCode);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (permissionListener != null) {
            permissionListener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
      super.onConfigurationChanged(newConfig);
      Intent intent = new Intent("onConfigurationChanged");
      intent.putExtra("newConfig", newConfig);
      this.sendBroadcast(intent);
    }
}
