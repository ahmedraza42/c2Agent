import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Image } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { fontFamily } from "../theme/Fonts";
import Button from "../components/CustumButton";
const { styles } = require("../style/MenteeChatListingStyles");
const { default: Text } = require("../components/Text");

export const EmptyView = ({ tabIndex }) => {
  return (
    <View style={styles.emptyView}>
      <Image
        style={styles.emptyChat}
        source={require("../assets/vectors/emptychat.png")}
      />

      <Text style={styles.emptySubText}>
        {tabIndex == 0
          ? "No Chats Received Yet"
          : "Received Coffees Will Be Displayed Here"}
      </Text>

      {tabIndex == 0 ? (
        <Text style={styles.emptySubText}>
          All received chats from fans will be displayed here. Keep checking
          your notifications and this screen to be notified of any incoming
          chats. Engage with your fans, answer their questions, and build
          connections through Mentoga.
        </Text>
      ) : (
        <Text style={styles.emptySubText}>
          Your fans can show their love by sending you virtual coffees. Spread
          the word and let them know how they can support and connect with you
          on Mentoga. It's a simple, heartfelt way to strengthen your bond.
          Start receiving your coffees today!
        </Text>
      )}
    </View>
  );
};

export const FanEmptyChatListing=({onPress})=>{
  return(
    <View style={styles.emptyView}>
        <Image
          style={styles.emptyChat}
          source={require("../assets/vectors/emptychat.png")}
        />
        <Text style={styles.emptyHeadingText}>
           Chat with Your Favorite Creators
        </Text>
        <Text style={styles.emptySubText}>
        Connect with the minds that inspire you! Whether it's fashion, health, business, education, or more, Mentoga unites creators across diverse fields. Start a one-on-one conversation, ask questions, seek guidance, or simply say hello. Your favorite creators are just a click away!
        </Text>
        <View style={styles.buttonView}>
          <Button
            onPress={onPress}
            text={"Find Creators"}
          />
        </View>
      </View>
  )
}

export const BookingEmptyView = () => {
  return (
    <View style={styles.emptyView}>
      <Image
        style={styles.emptyChat}
        source={require("../assets/vectors/emptychat.png")}
      />
      <Text style={styles.emptyHeadingText}>No Scheduled eMeetings</Text>
      <Text style={styles.emptySubText}>
        All scheduled eMeetings will appear here. Ensure you have opened slots
        to receive eMeeting bookings. Stay tuned to your notifications and this
        page for any new eMeetings.
      </Text>
    </View>
  );
};

export const FanEmptyChat = ({ item }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ scaleY: -1 }],
        paddingHorizontal: moderateScale(20),
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily.gilroyBold,
          fontSize: moderateScale(20),
          textAlign: "center",
        }}
      >
        {`Chat One-on-One with ${item?.mentor?.fullName || ""}`}
      </Text>
      <Text
        style={{
          marginTop: moderateScale(15),
          fontFamily: fontFamily.gilroyMedium,
          fontSize: moderateScale(14),
          textAlign: "center",
        }}
      >
        {`Ready to connect one-on-one with ${item?.mentor?.fullName}? Start your conversation using text, voice, or video, whatever suits you best. Remember, text messages have a 250-character limit, and voice/video messages have a 1-minute duration. You'll be charged for each individual message, not the entire conversation, so choose your words wisely. ${item?.mentor?.fullName} is waiting to hear from you!`}
      </Text>
    </View>
  );
};
