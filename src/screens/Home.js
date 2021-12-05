import React, { useState } from 'react';
import { View, Button, Text, Image, StyleSheet, TextInput } from 'react-native';
import { auth } from '../../App';
import Heading from '../components/Heading';
import { useAuth } from '../contexts/AuthProvider';
import { YOUTUBE_DATA_API } from '@env';
import Scrollable from '../components/Scrollable';
import colors from '../colors';
import VideoOverview from '../components/VideoOverview';

export default function Home() {
  const [user] = useAuth();
  const [, setIsAuthenticated] = useAuth();

  async function fetchChannel() {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${encodeURIComponent(
        channelName
      )}&key=${YOUTUBE_DATA_API}`
    );
    const data = await res.json();
    const { channelId, channelTitle, description, thumbnails } =
      data.items[0].snippet;
    console.log({ channelId, channelTitle, description, thumbnails });
  }

  async function signOut() {
    await auth.signOut();
    setIsAuthenticated(false);
  }

  const stats = {
    duration: '1h 45min',
    likesCount: '3.4K',
    viewsCount: '1.4M',
  };

  return (
    <Scrollable>
      <View style={styles.container}>
        <View style={styles.header}>
          <Heading size="1">Explore popular videos.</Heading>
          <Text style={{ color: colors.redishGrey }}>
            Swipe Right to Watch Later Click to View
          </Text>
        </View>

        <View style={styles.videos}>
          <VideoOverview
            stats={stats}
            title="Sample Video Title"
            channelName="Sample Channel"
            image="https://picsum.photos/1280/720"
          />
          <VideoOverview
            stats={stats}
            title="How to this"
            channelName="How tos"
            image="https://picsum.photos/1280/720"
          />
          <VideoOverview
            stats={stats}
            title="Learn x in y hours"
            channelName="The Learners"
            image="https://picsum.photos/1280/720"
          />
        </View>
        <Button title="Logout" onPress={signOut} />
      </View>
    </Scrollable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  header: {
    marginTop: 20,
  },
  videos: {
    marginTop: 40,
  },
});
