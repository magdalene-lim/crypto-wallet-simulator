(function () {
  const state = window.WalletSim.loadState();
  const $ = (id) => document.getElementById(id);
  const addressEl=$('address'), privateKeyEl=$('privateKey'), balanceEl=$('balance'), txListEl=$('txList'), messageEl=$('message');
  const generateBtn=$('generateBtn'), receiveBtn=$('receiveBtn'), resetBtn=$('resetBtn'), sendForm=$('sendForm'), toggleKeyBtn=$('toggleKeyBtn');

  const showMessage=(t,c='')=>{ messageEl.textContent=t; messageEl.className=`message ${c}`.trim(); };
  const fmt=(iso)=>new Date(iso).toLocaleString();

  function renderWallet(){
    addressEl.textContent = state.wallet ? state.wallet.address : 'Not generated yet';
    privateKeyEl.textContent = state.wallet ? state.wallet.privateKey : 'Not generated yet';
    balanceEl.textContent = `${Number(state.balance).toFixed(2)} SIM`;
  }
  function renderTxs(){
    txListEl.innerHTML='';
    if(!state.transactions.length){ const li=document.createElement('li'); li.className='tx-item'; li.textContent='No transactions yet.'; txListEl.appendChild(li); return; }
    state.transactions.forEach(tx=>{
      const li=document.createElement('li'); li.className='tx-item';
      li.innerHTML=`<div><strong>${tx.type.toUpperCase()}</strong> — ${Number(tx.amount).toFixed(2)} SIM</div>
      <div class="tx-meta">${fmt(tx.timestamp)} • ${tx.status}</div>
      <div class="tx-meta mono">From: ${tx.from}</div>
      <div class="tx-meta mono">To: ${tx.to}</div>
      <div class="tx-meta mono">TxID: ${tx.id}</div>`;
      txListEl.appendChild(li);
    });
  }
  const render=()=>{ renderWallet(); renderTxs(); };

  generateBtn.addEventListener('click',()=>{ window.WalletSim.createWallet(state); window.WalletSim.saveState(state); render(); showMessage('Wallet generated successfully.','success'); });
  receiveBtn.addEventListener('click',()=>{ window.WalletSim.receiveFunds(state,100); render(); showMessage('Received 100 SIM from faucet (simulated).','success'); });
  resetBtn.addEventListener('click',()=>{ if(!confirm('Reset simulator? This clears wallet and transaction history.')) return; const n=window.WalletSim.resetState(); state.wallet=n.wallet; state.balance=n.balance; state.transactions=n.transactions; render(); showMessage('Simulator reset complete.','success'); });
  sendForm.addEventListener('submit',(e)=>{ e.preventDefault(); const f=new FormData(sendForm); const recipient=String(f.get('recipient')||'').trim(); const amount=Number(f.get('amount')); try{ window.WalletSim.sendFunds(state,recipient,amount); render(); sendForm.reset(); showMessage('Transaction sent and confirmed (simulated).','success'); }catch(err){ showMessage(err.message||'Failed to send transaction.','error'); }});
  toggleKeyBtn.addEventListener('click',()=>privateKeyEl.classList.toggle('blur'));

  render();
})();
