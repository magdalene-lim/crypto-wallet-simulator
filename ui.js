(function () {
  const state = window.WalletSim.loadState();
  const $ = (id) => document.getElementById(id);
  const walletNameEl=$('walletName'), addressEl=$('address'), privateKeyEl=$('privateKey'), balanceEl=$('balance'), txListEl=$('txList'), messageEl=$('message');
  const generateBtn=$('generateBtn'), receiveBtn=$('receiveBtn'), resetBtn=$('resetBtn'), sendForm=$('sendForm'), toggleKeyBtn=$('toggleKeyBtn');
  const wallet1Btn=$('wallet1Btn'), wallet2Btn=$('wallet2Btn'), renameBtn=$('renameBtn');

  const showMessage=(t,c='')=>{ messageEl.textContent=t; messageEl.className=`message ${c}`.trim(); };
  const fmt=(iso)=>new Date(iso).toLocaleString();

  function renderWallet(){
    const active = window.WalletSim.getActiveWallet(state);
    walletNameEl.textContent = active.name;
    addressEl.textContent = active.wallet ? active.wallet.address : 'Not generated yet';
    privateKeyEl.textContent = active.wallet ? active.wallet.privateKey : 'Not generated yet';
    balanceEl.textContent = `${Number(active.balance).toFixed(2)} RP`;
    
    // Update active wallet button
    wallet1Btn.classList.toggle('active', state.activeWalletId === 1);
    wallet2Btn.classList.toggle('active', state.activeWalletId === 2);
    wallet1Btn.textContent = state.wallets[0].name;
    wallet2Btn.textContent = state.wallets[1].name;
  }
  
  function renderTxs(){
    const active = window.WalletSim.getActiveWallet(state);
    txListEl.innerHTML='';
    if(!active.transactions.length){ 
      const li=document.createElement('li'); 
      li.className='tx-item'; 
      li.textContent='No transactions yet.'; 
      txListEl.appendChild(li); 
      return; 
    }
    active.transactions.forEach(tx=>{
      const li=document.createElement('li'); 
      li.className='tx-item';
      li.innerHTML=`<div><strong>${tx.type.toUpperCase()}</strong> — ${Number(tx.amount).toFixed(2)} RP</div>
      <div class="tx-meta">${fmt(tx.timestamp)} • ${tx.status}</div>
      <div class="tx-meta mono">From: ${tx.from}</div>
      <div class="tx-meta mono">To: ${tx.to}</div>
      <div class="tx-meta mono">TxID: ${tx.id}</div>`;
      txListEl.appendChild(li);
    });
  }
  
  const render=()=>{ renderWallet(); renderTxs(); };

  wallet1Btn.addEventListener('click',()=>{ 
    window.WalletSim.setActiveWallet(state, 1); 
    render(); 
    showMessage('Switched to ' + state.wallets[0].name, 'success'); 
  });
  
  wallet2Btn.addEventListener('click',()=>{ 
    window.WalletSim.setActiveWallet(state, 2); 
    render(); 
    showMessage('Switched to ' + state.wallets[1].name, 'success'); 
  });
  
  renameBtn.addEventListener('click',()=>{ 
    const active = window.WalletSim.getActiveWallet(state);
    const newName = prompt(`Enter new name for ${active.name}:`, active.name);
    if (newName && newName.trim()) {
      window.WalletSim.renameWallet(state, active.id, newName);
      render();
      showMessage('Wallet renamed successfully.', 'success');
    }
  });

  generateBtn.addEventListener('click',()=>{ 
    window.WalletSim.createWallet(state); 
    window.WalletSim.saveState(state); 
    render(); 
    showMessage('Wallet generated successfully.','success'); 
  });
  
  receiveBtn.addEventListener('click',()=>{ 
    window.WalletSim.receiveFunds(state, 100); 
    render(); 
    showMessage('Received 100 RP from faucet (simulated).','success'); 
  });
  
  resetBtn.addEventListener('click',()=>{ 
    if(!confirm('Reset simulator? This clears ALL wallets and transaction history.')) return; 
    const n = window.WalletSim.resetState(); 
    state.wallets = n.wallets; 
    state.activeWalletId = n.activeWalletId; 
    render(); 
    showMessage('Simulator reset complete.','success'); 
  });
  
  sendForm.addEventListener('submit',(e)=>{ 
    e.preventDefault(); 
    const f = new FormData(sendForm); 
    const recipient = String(f.get('recipient')||'').trim(); 
    const amount = Number(f.get('amount')); 
    try { 
      window.WalletSim.sendFunds(state, recipient, amount); 
      render(); 
      sendForm.reset(); 
      showMessage('Transaction sent and confirmed (simulated).','success'); 
    } catch(err) { 
      showMessage(err.message||'Failed to send transaction.','error'); 
    }
  });
  
  toggleKeyBtn.addEventListener('click',()=>privateKeyEl.classList.toggle('blur'));

  render();
})();
