"use client";
import '@radix-ui/themes/styles.css';
import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import './TradeForm.css';
import {Select, Theme} from '@radix-ui/themes';

const TabsDemo = () => (
    // eslint-disable-next-line react/jsx-no-undef
    <Theme>
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Manage your account">
                <Tabs.Trigger className="TabsTrigger" value="tab1">
                    Market Order
                </Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="tab2">
                    Limit Order
                </Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="tab3">
                    Stop Order
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">
                <p className="Text" style={{textAlign: "center"}}>Make sure you understand what you are doing. <span
                    style={{color: "#CE2C31FF"}}>Trading is risky. </span>To learn more about trading visit our docs.
                </p>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="type">
                        Buy or Sell
                    </label>
                    <Select.Root defaultValue="buy">
                        <Select.Trigger/>
                        <Select.Content>
                            <Select.Group>
                                <Select.Label>Select to Buy or Sell</Select.Label>
                                <Select.Item value="buy">Buy</Select.Item>
                                <Select.Item value="sell">Sell</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="asset">
                        Asset to Trade
                    </label>
                    <Select.Root defaultValue="crypto1">
                        <Select.Trigger/>
                        <Select.Content>
                            <Select.Group>
                                <Select.Item value="crypto1">Bitcoin</Select.Item>
                                <Select.Item value="crypto2">Etherium</Select.Item>
                                <Select.Item value="crypto3">Solana</Select.Item>
                                <Select.Item value="crypto4">Binance Coin</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="name">
                        Amount
                    </label>
                    <input placeholder="in GBP" className="Input" id="name"/>
                </fieldset>
                <div style={{display: 'flex', marginTop: 20, justifyContent: 'flex-end'}}>
                    <button className="Button red">Execute Trade</button>
                </div>
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">
                <p className="Text" style={{textAlign: "center"}}>Make sure you understand what you are doing. <span
                    style={{color: "#CE2C31FF"}}>Trading is risky. </span>To learn more about trading visit our docs.
                </p>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="type">
                        Buy or Sell
                    </label>
                    <Select.Root defaultValue="buy">
                        <Select.Trigger/>
                        <Select.Content>
                            <Select.Group>
                                <Select.Label>Select to Buy or Sell</Select.Label>
                                <Select.Item value="buy">Buy</Select.Item>
                                <Select.Item value="sell">Sell</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="asset">
                        Asset to Trade
                    </label>
                    <Select.Root defaultValue="crypto1">
                        <Select.Trigger/>
                        <Select.Content>
                            <Select.Group>
                                <Select.Item value="crypto1">Bitcoin</Select.Item>
                                <Select.Item value="crypto2">Etherium</Select.Item>
                                <Select.Item value="crypto3">Solana</Select.Item>
                                <Select.Item value="crypto4">Binance Coin</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="name">
                        Execution Price for Limit Order
                    </label>
                    <input placeholder="in GBP" className="Input" id="name"/>
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="name">
                        Amount
                    </label>
                    <input placeholder="in GBP" className="Input" id="name"/>
                </fieldset>
                <div style={{display: 'flex', marginTop: 20, justifyContent: 'flex-end'}}>
                    <button className="Button red">Execute Trade</button>
                </div>
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab3">
                <p className="Text" style={{textAlign: "center"}}>Make sure you understand what you are doing. <span
                    style={{color: "#CE2C31FF"}}>Trading is risky. </span>To learn more about trading visit our docs.
                </p>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="type">
                        Buy or Sell
                    </label>
                    <Select.Root defaultValue="buy">
                        <Select.Trigger/>
                        <Select.Content>
                            <Select.Group>
                                <Select.Label>Select to Buy or Sell</Select.Label>
                                <Select.Item value="buy">Buy</Select.Item>
                                <Select.Item value="sell">Sell</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="asset">
                        Asset to Trade
                    </label>
                    <Select.Root defaultValue="crypto1">
                        <Select.Trigger/>
                        <Select.Content>
                            <Select.Group>
                                <Select.Item value="crypto1">Bitcoin</Select.Item>
                                <Select.Item value="crypto2">Etherium</Select.Item>
                                <Select.Item value="crypto3">Solana</Select.Item>
                                <Select.Item value="crypto4">Binance Coin</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="name">
                        Stop Price
                    </label>
                    <input placeholder="in GBP" className="Input" id="name"/>
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="name">
                        Amount
                    </label>
                    <input placeholder="in GBP" className="Input" id="name" defaultValue=""/>
                </fieldset>
                <div style={{display: 'flex', marginTop: 20, justifyContent: 'flex-end'}}>
                    <button className="Button red">Execute Trade</button>
                </div>
            </Tabs.Content>
        </Tabs.Root>
        {/*<ThemePanel />*/}
    </Theme>
);

export default TabsDemo;