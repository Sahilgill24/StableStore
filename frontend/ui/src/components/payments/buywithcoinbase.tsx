import { useEffect, useRef, useState } from 'react';
import { CBPayInstanceType, initOnRamp } from '@coinbase/cbpay-js';
import { Button } from '../ui/button';
import coinBaseLogo from '@/assets/coinbase-logo.png'
import Spinner from '@/components/ui/spinner'
type InitOnRampOptions = Parameters<typeof initOnRamp>[0];

type CoinbaseButtonProps = {
    destinationWalletAddress: string;
};

export function CoinbaseButton({ destinationWalletAddress }: CoinbaseButtonProps) {
    const [isReady, setIsReady] = useState(false);
    const onrampInstance = useRef<CBPayInstanceType | null>();

    useEffect(() => {
        //initOnRamp parameters
        const options: InitOnRampOptions = {
            appId: 'cf13b9b9-e45e-445b-9572-72514f2d13d1',
            target: '#cbpay-container',
            widgetParameters: {
                destinationWallets: [{
                    address: destinationWalletAddress,
                    blockchains: ['ethereum', 'algorand'],
                }],
            },
            onSuccess: () => {
                // handle navigation when user successfully completes the flow
            },
            onExit: () => {
                // handle navigation from dismiss / exit events due to errors
            },
            onEvent: (event) => {
                // event stream
            },
            experienceLoggedIn: 'embedded',
            experienceLoggedOut: 'popup',
        };
        console.log(options)

        // instance.destroy() should be called before initOnramp if there is already an instance.
        if (onrampInstance.current) {
            onrampInstance.current.destroy();
        }

        initOnRamp(options, (error, instance) => {
            if (instance) {
                onrampInstance.current = instance;
                setIsReady(true);
            }
        });
    }, [destinationWalletAddress])

    const handleOnPress = () => {
        if (onrampInstance.current) {
            onrampInstance.current.open();
        }
    }

    // render with button from previous example
    return (
        <Button onClick={handleOnPress}>
            {isReady ? (
                <img src={coinBaseLogo} />
            ): (
                <Spinner className='w-6 h-6' />
                )      
            }
        </Button>
    );
}