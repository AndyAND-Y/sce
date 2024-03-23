"use client";
import '@radix-ui/themes/styles.css';
import React, {FormEvent, useState} from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import './TradeForm.css';
import { Select, Theme } from '@radix-ui/themes';

const TradeForm = () => {
    const [tradeType, setTradeType] = useState<string>('buy');
    const [asset, setAsset] = useState<string>('bitcoin');
    const [orderType, setOrderType] = useState<string>('market-order');
    const [executionPrice, setExecutionPrice] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Prevent the form from submitting in the traditional way
        // Log the form data to the console
        console.log({
            tradeType,
            asset,
            orderType,
            executionPrice,
            amount,
        });
    };

    return (
        <Theme>
            <Tabs.Root className="TabsRoot" defaultValue="tab1">
                <Tabs.List className="TabsList" aria-label="Manage your account">
                    <Tabs.Trigger className="TabsTrigger" value="tab1">Trade</Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content className="TabsContent" value="tab1">
                    <form className="trade-form" onSubmit={handleSubmit}>

                        {/* Rest of the form */}

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="type">Buy or Sell</label>
                            <Select.Root value={tradeType} onValueChange={setTradeType}>
                                <Select.Trigger/>
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Item value="buy">Buy</Select.Item>
                                        <Select.Item value="sell">Sell</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="asset">Asset to Trade</label>
                            <Select.Root value={asset} onValueChange={setAsset}>
                                <Select.Trigger/>
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Item value="bitcoin">Bitcoin</Select.Item>
                                        <Select.Item value="etherium">Etherium</Select.Item>
                                        <Select.Item value="solana">Solana</Select.Item>
                                        <Select.Item value="binance-coin">Binance Coin</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </fieldset>


                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="order-type">
                                Order Type
                            </label>
                            <Select.Root value={orderType} onValueChange={setOrderType}>
                                <Select.Trigger/>
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Item value="market-order">Market Order</Select.Item>
                                        <Select.Item value="limit-order">Limit Order</Select.Item>
                                        <Select.Item value="stop-order">Stop Order</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="executionPrice">Execution Price for Limit/Stop
                                Order</label>
                            <input
                                placeholder="in GBP"
                                className="Input"
                                id="executionPrice"
                                value={executionPrice}
                                onChange={(e) => setExecutionPrice(e.target.value)}
                                disabled={orderType === 'market-order'} // Disable input if orderType is 'market-order'
                                style={{ backgroundColor: orderType === 'market-order' ? '#f0f0f0' : '' }} // Optional: Change background color when disabled
                            />
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="amount">Amount</label>
                            <input
                                placeholder="in GBP"
                                className="Input"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </fieldset>

                        <div style={{display: 'flex', marginTop: 20, justifyContent: 'flex-end'}}>
                            <button className="Button red" type="submit">Execute Trade</button>
                        </div>
                    </form>
                </Tabs.Content>
            </Tabs.Root>
        </Theme>
    );
};

export default TradeForm;
