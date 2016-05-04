
api_keys=["AIzaSyDD1uPYSaiDOeGcH6cNo8FycXy79qCy7Mc", "AIzaSyBP8oG7ZeNe_cBrKq4K69wnIZ6tzGUZu-0","AIzaSyB7f5agkYBIaRvzZnaKEvdLZnBuByrQvcE"]

Yt.configure do |config|
  config.api_key = api_keys[ srand()%api_keys.size ]

end


# OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE




