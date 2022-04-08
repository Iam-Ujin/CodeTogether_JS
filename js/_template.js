const _tpl = {
	input(inputOrder) {
		return ` 
        <div class="w-full px-3 mb-6">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="input-value${inputOrder}">
            입력${inputOrder}
            </label>
            <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-50 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="input-value${inputOrder}" type="text" placeholder="1234">
            <p class="text-orange-500 text-xs italic">값을 입력해주세요</p>
        </div>`;
	},
};
