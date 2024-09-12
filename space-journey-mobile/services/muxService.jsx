import axios from 'axios';
import { MUX_TOKEN_ID, MUX_TOKEN_SECRET } from '@env';

const MUX_API_BASE_URL = 'https://api.mux.com';

const createLiveStream = async () => {
  try {
    const response = await axios.post(
      `${MUX_API_BASE_URL}/video/v1/live-streams`,
      {
        "playback_policy": ["public"],
        "new_asset_settings": { "playback_policy": ["public"] },
      },
      {
        auth: {
          username: MUX_TOKEN_ID,
          password: MUX_TOKEN_SECRET,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const playbackId = response.data.data.playback_ids[0].id;
    console.log('Live Stream Created: Playback ID:', playbackId);
    return playbackId;
  } catch (error) {
    console.error('Error creating live stream:', error);
  }
};
