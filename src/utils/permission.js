import { PermissionsAndroid } from "react-native";

export async function requestLocationPermission() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Note',
        'message': 'C2 App wants to access your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    } else {
        return false
    }
  } catch (err) {
    return false
  }
}