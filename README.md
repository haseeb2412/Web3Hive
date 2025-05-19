# Web3Hive 🐝

**Web3Hive** is a decentralized web application that allows users to **transfer ETH** to others with a custom **message** and a **GIF from Giphy** — making transactions more fun and expressive!

---

## 📦 Tech Stack

### 🔹 Frontend (client/)
- React 19
- Ethers.js 6
- Tailwind CSS
- Framer Motion
- React Router DOM
- Giphy API

### 🔹 Backend (smart_contract/)
- Foundry (Ethereum smart contract framework)

---

## 🖼️ Transaction Flow

[Sender] → [Message + ETH + GIF] → [Smart Contract] → [Receiver sees Message + GIF]

---

## 🚀 Features

- 🔐 Connect wallet using MetaMask
- 💸 Send ETH to any address with message + GIF
- 🧾 View all past transactions on the UI
- 🎨 Smooth animations and responsive design

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/haseeb2412/Web3Hive
cd web3hive

2. Install frontend dependencies

cd client
npm install
npm run dev

3. Compile smart contracts


cd ../smart_contract
forge build
forge test
Make sure you have Foundry installed

✨ Demo
Live link (if deployed):
🔗 https://your-live-demo-link.com




