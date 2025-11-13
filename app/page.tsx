'use client'
// memo: 円の価値低下率を1%としてその差を視覚化する

import { useState } from 'react'

export default function Home() {

  const [count, setCount] = useState(1000000)
  const [year, setYear] = useState(0)
  // 型定義を追加
  const [interestRate, setInterestRate] = useState<number | string>(2)
  const [initialAmount, setInitialAmount] = useState<number | string>(1000000)

  const handleInitialAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    
    // 空文字列の場合は空文字列のまま保持
    if (inputValue === '') {
      setInitialAmount('')
      return
    }
    
    const numValue = parseFloat(inputValue)
    
    // NaNの場合は空文字列に設定
    if (isNaN(numValue)) {
      setInitialAmount('')
      return
    }
    
    setInitialAmount(numValue)
  }

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    
    // 空文字列の場合は空文字列のまま保持
    if (inputValue === '') {
      setInterestRate('')
      return
    }
    
    const numValue = parseFloat(inputValue)
    
    // NaNの場合は空文字列に設定
    if (isNaN(numValue)) {
      setInterestRate('')
      return
    }
    
setInterestRate(numValue)
  }

  const increment = () => {
    // 値を数値に変換
    const rate = typeof interestRate === 'string' ? parseFloat(interestRate) : interestRate
    const amount = typeof initialAmount === 'string' ? parseFloat(initialAmount) : initialAmount
    
    // バリデーション: 有効な数値かチェック
    if (isNaN(rate) || isNaN(amount) || rate < 0 || amount < 0) {
      // 無効な値の場合は計算を実行しない
      return
    }
    
    const newYear = year + 1
    setCount(amount * Math.pow(1 + rate / 100, newYear))
    setYear(newYear)
  }

  const reset = () => {
    setCount(1000000)
    setInitialAmount(1000000)
    setYear(0)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-8">
          複利カウンター
        </h1>
        <div className="text-6xl font-bold text-center mb-8 text-blue-600">
          {/* 小数点を非表示にする */}
          {/* 三桁ごとにカンマを入れる */}
          {isNaN(count) ? 0 : count.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 円  
        </div>   
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
     
        
        <div className="text-2xl font-bold text-center mb-8 text-blue-600">
          {year} years
        </div>
        
        <div className="text-2xl font-bold text-center mb-8 text-blue-600">
          {/* 利率がNanの場合は0にする */}
          {(() => {
            const rate = typeof interestRate === 'string' ? parseFloat(interestRate) : interestRate
            return isNaN(rate) ? 0 : rate
          })()}%
          
        </div>
        {/* 2桁のみ入力可能にする */}
        {/* 利率inputの横に利率：と表示する。まだ横並びになっていない。flexで横並びにする */}
        <div className="flex items-center mb-4 gap-2">
          <div className="w-40 p-2">
            利率：
          </div>
          <input type="number" value={interestRate === '' || (typeof interestRate === 'number' && isNaN(interestRate)) ? '' : interestRate} onChange={handleInterestRateChange} className="w-full p-2 border border-gray-300 rounded-md" maxLength={2}/>
        </div>
        
        <div className="flex items-center mb-4 gap-2">
          <div className="w-40 p-2">
            初期金額：            
          </div>
          
          <input type="number" value={initialAmount === '' || (typeof initialAmount === 'number' && isNaN(initialAmount)) ? '' : initialAmount} onChange={handleInitialAmountChange}
        className="w-full p-2 border border-gray-300 rounded-md" maxLength={2}/>
        </div>

        
        <div className="flex gap-4">
          <button
            onClick={increment}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            +1 year
          </button>
          
          <button
            onClick={reset}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
          >
            リセット
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}