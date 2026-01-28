"use client";

import Copyright from "@/components/shared/copyright";

export default function Footer() {
  return (
    <footer className="mt">
      <div className="col col1">
        <h3>CoolSite</h3>
        <p>Made by Jux</p>
        <div className="social">
          <a
            href="https://codepen.io/Juxtopposed"
            target="_blank"
            className="link"
          >
            <img src="https://assets.codepen.io/9051928/codepen_1.png" alt="" />
          </a>
          <a
            href="https://twitter.com/juxtopposed"
            target="_blank"
            className="link"
          >
            <img src="https://assets.codepen.io/9051928/x.png" alt="" />
          </a>
          <a
            href="https://youtube.com/@juxtopposed"
            target="_blank"
            className="link"
          >
            <img src="https://assets.codepen.io/9051928/youtube_1.png" alt="" />
          </a>
        </div>
        <Copyright />
      </div>
      <div className="flex flex-col items-start justify-start w-1/3 bg-red-300 rounded-sm">
        <p>About</p>
        <p>Our mission</p>
        <p>Privacy Policy</p>
        <p>Terms of service</p>
      </div>
      <div className="flex flex-col items-start justify-start w-1/3 bg-red-300 rounded-sm">
        <p>Services</p>
        <p>Products</p>
        <p>Join our team</p>
        <p>Partner with us</p>
      </div>
      <div
        className="
          absolute inset-0 -z-5
          backdrop-blur-2xl
          mask-[linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5)_10%,rgba(0,0,0,0.8)_20%,rgba(0,0,0,1)_30%,rgb(0,0,0))]
          [-webkit-mask-image:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5)_10%,rgba(0,0,0,0.8)_20%,rgba(0,0,0,1)_30%,rgb(0,0,0))]
        "
      />
    </footer>
  );
}
