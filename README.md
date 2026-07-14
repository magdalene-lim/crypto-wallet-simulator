# RP Coin Wallet Simulator

An educational, browser-based simulator to help learners understand how digital crypto wallets work—**without using real blockchain or real funds**.

## 📚 Educational Purpose Disclaimer

⚠️ **This is a simulation for educational purposes only.** It does NOT interact with any real blockchain, does not use real cryptocurrency, and should never be used with real crypto assets. RP Coin is a simulated currency created solely for learning.

## Overview

This simulator demonstrates core wallet concepts in an interactive way:
- **2 Wallets**: Create and manage two separate wallets that you can name
- **Wallet Generation**: Create simulated wallets with public addresses and private keys
- **Send & Receive**: Simulate transactions between addresses using RP Coins
- **Transaction History**: Track all simulated transactions per wallet
- **Learning-Focused**: Built-in guide and tooltips for key concepts
- **Persistent State**: Your wallets persist in browser storage

## Features

### 🪙 Dual Wallet Management
- Manage two separate wallets simultaneously
- Customize wallet names for easy identification
- Switch between wallets with one click
- Each wallet has its own balance and transaction history

### 💰 RP Coin Transactions
- **Receive funds**: Use a faucet to add 100 RP test coins to your wallet
- **Send funds**: Transfer RP coins to another simulated address
- **Input validation**: Checks for valid address format and sufficient balance
- **Transaction history**: Complete ledger of all transactions with timestamps

### 📖 Quick Start Guide
- Step-by-step instructions built into the interface
- Helpful tips for learners
- Clear explanations of wallet concepts
- Interactive learning experience

### 📚 Educational Features
- Tooltips explaining wallet addresses, private keys, and transaction flow
- Clear labeling of simulated/mock values
- Step-by-step transaction confirmation simulation
- Visual feedback on success/error states
- Prominent educational disclaimer

### 💾 Persistence
- Wallet state saved in browser localStorage
- Survives page refreshes
- One-click reset available for both wallets

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installations or dependencies required

### Setup & Run

1. Clone this repository:
   ```bash
   git clone https://github.com/magdalene-lim/crypto-wallet-simulator.git
   cd crypto-wallet-simulator
   ```

2. Open `index.html` in your browser:
   ```bash
   # macOS / Linux
   open index.html
   
   # Windows
   start index.html
   ```

   Or simply drag `index.html` into your browser window.

3. Your wallets are ready to use! Follow the Quick Start Guide in the interface.

## How to Use

### 1. Select a Wallet
- Choose between Wallet 1 or Wallet 2
- Click "Rename Current Wallet" to give it a custom name

### 2. Generate a Wallet
- Click "Generate Wallet" to create a simulated address and private key
- Your wallet will have a unique address and balance

### 3. Receive RP Coins
- Click "Receive 100 RP (Faucet)" to add test funds
- Each wallet can receive unlimited test funds

### 4. Send RP Coins
- Enter a recipient address (try the other wallet's address!)
- Enter an amount to send
- Click "Send" to complete the transaction

### 5. View Transaction History
- All transactions are recorded per wallet
- Switch between wallets to see their individual histories

## Project Structure

```
crypto-wallet-simulator/
├── index.html          # Main HTML entry point with guide
├── style.css           # Styling and layout
├── wallet.js           # Wallet logic (2 wallets support)
├── ui.js               # UI interactions and rendering
└── README.md           # This file
```

## How It Works

### Wallet Generation
- Each wallet gets a random 40-character hex string as its public address
- A mock private key is shown (clearly labeled as simulated)
- Each wallet starts with 0 RP balance

### RP Coin (Simulated Cryptocurrency)
- RP is the simulated currency used in this wallet
- It has no real-world value
- Perfect for learning without financial risk

### Multiple Wallets
- Two independent wallets with separate balances and transaction histories
- Transfer RP coins between your own wallets to learn how transactions work
- Each wallet can be renamed for easy identification

### Transactions
- All standard validation (address format, sufficient balance)
- Instant "confirmation" (no real blockchain delays)
- Complete transaction records with timestamps and IDs

## Learning Concepts

This simulator introduces learners to:
- **Public Address**: Your wallet's receiving address (like an email for crypto)
- **Private Key**: Secret key that signs transactions (never share!)
- **Balance**: Total RP coins in your wallet
- **Transactions**: Records of send/receive activity
- **Transaction Hash**: Unique identifier for each transaction (simulated)
- **Multiple Wallets**: Managing different accounts
- **Wallet Management**: Organizing and naming wallets

## Disclaimers

⚠️ **This is a simulation only:**
- No real blockchain is involved
- No real cryptocurrency or funds are at risk
- RP Coin is entirely fictional and has no value
- Private keys here are not cryptographically secure
- This should never be used for real cryptocurrency

✅ **Perfect for:**
- Learning how wallets work
- Understanding transaction concepts
- Teaching blockchain basics to beginners
- Interactive demonstrations in classrooms
- Safe experimentation with multi-wallet scenarios

## Technical Notes

- **No dependencies**: Uses vanilla JavaScript only
- **localStorage**: Wallet data persists in browser storage (clear browser data to reset)
- **Responsive design**: Works on desktop and mobile
- **Beginner-friendly code**: Comments and clear structure for learning

## Contributing

Feel free to fork, modify, or suggest improvements!

## License

MIT License – use freely for educational purposes.

---

**Happy learning! 🚀**
