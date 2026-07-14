# Crypto Wallet Simulator

An educational, browser-based simulator to help learners understand how digital crypto wallets work—**without using real blockchain or real funds**.

## Overview

This simulator demonstrates core wallet concepts in an interactive way:
- **Wallet Generation**: Create a simulated wallet with a public address and private key
- **Send & Receive**: Simulate transactions between addresses
- **Transaction History**: Track all simulated transactions
- **Learning-Focused**: Tooltips and explanations for key concepts
- **Persistent State**: Your wallet persists in browser storage

⚠️ **Disclaimer**: This is a simulation for educational purposes only. It does NOT interact with any real blockchain and should never be used with real crypto assets.

## Features

### 🪙 Wallet Management
- Generate a new wallet with a simulated public address and private key
- View current balance in SIM (simulated coin)
- Reset wallet to start fresh

### 💸 Transactions
- **Receive funds**: Use a faucet to add test funds to your wallet
- **Send funds**: Transfer to another simulated address
- **Input validation**: Checks for valid address format and sufficient balance
- **Transaction history**: Complete ledger of all transactions with timestamps

### 📚 Educational Features
- Tooltips explaining wallet addresses, private keys, and transaction flow
- Clear labeling of simulated/mock values
- Step-by-step transaction confirmation simulation
- Visual feedback on success/error states

### 💾 Persistence
- Wallet state saved in browser localStorage
- Survives page refreshes
- One-click reset available

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

3. Your wallet is ready to use! Start by clicking **"Generate Wallet"** or **"Receive Funds"**.

## Project Structure

```
crypto-wallet-simulator/
├── index.html          # Main HTML entry point
├── style.css           # Styling and layout
├── wallet.js           # Wallet logic and utilities
├── ui.js               # UI interactions and rendering
└── README.md           # This file
```

## How It Works

### 1. Wallet Generation
- A random 40-character hex string is generated as your public address
- A mock private key is shown (clearly labeled as simulated)
- Balance starts at 0 SIM

### 2. Receiving Funds
- Click **"Receive Funds"** to add 100 SIM to your balance via faucet
- Each faucet transaction is recorded in history

### 3. Sending Funds
- Enter a recipient address and amount
- The simulator validates:
  - Recipient address matches the expected format (40 hex chars)
  - Amount is positive
  - Your balance is sufficient
- On success, funds are deducted and a transaction record is created

### 4. Transaction History
- Every send/receive is logged with timestamp, type, amount, and addresses
- Transactions are displayed in reverse chronological order (newest first)

## Learning Concepts

This simulator introduces learners to:
- **Public Address**: Your wallet's receiving address (like an email for crypto)
- **Private Key**: Secret key that signs transactions (never share!)
- **Balance**: Total funds in your wallet
- **Transactions**: Records of send/receive activity
- **Transaction Hash**: Unique identifier for each transaction (simulated)
- **Confirmation**: Process of a transaction being recorded (simulated here)

## Disclaimers

⚠️ **This is a simulation only:**
- No real blockchain is involved
- No real funds are at risk
- Private keys here are not cryptographically secure
- This should never be used for real cryptocurrency

✅ **Perfect for:**
- Learning how wallets work
- Understanding transaction concepts
- Teaching blockchain basics to beginners
- Interactive demonstrations in classrooms

## Technical Notes

- **No dependencies**: Uses vanilla JavaScript only
- **localStorage**: Wallet data persists in browser storage (clear browser data to reset)
- **Responsive design**: Works on desktop and mobile
- **Beginner-friendly code**: Comments and clear structure for learning

## Future Enhancements

Possible improvements (out of scope for MVP):
- Multiple wallet support
- QR code generation for addresses
- More realistic transaction fees
- Network simulation (pending/confirmed states)
- Export wallet data
- Ledger visualization charts

## Contributing

Feel free to fork, modify, or suggest improvements!

## License

MIT License – use freely for educational purposes.

---

**Happy learning! 🚀**
