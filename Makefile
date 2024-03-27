build:
	rustup target add wasm32-unknown-unknown
	RUSTFLAGS='-C link-arg=-s' cargo build --release --target wasm32-unknown-unknown 
	cp target/wasm32-unknown-unknown/release/contract.wasm contract.wasm
	cat ./contract.wasm | gzip -9 > ./contract.wasm.gz
	
clean:
	cargo clean
	rm contract.wasm contract.wasm.gz
