//crc64:ca7b983741621055
//crc64_with_comments:0000000000000000
#include "runtime-headers.h"

template<typename T>
typename Storage::loader<T>::loader_fun Storage::loader<T>::get_function(int tag) noexcept {
  switch(tag){
    case -1050344780: return Storage::load_implementation_helper<int64_t, T>::load;
    case -1001899880: return Storage::load_implementation_helper<void, T>::load;
    case -878368721: return Storage::load_implementation_helper<class_instance<C$PDOStatement>, T>::load;
    case -214445580: return Storage::load_implementation_helper<array< array< mixed > >, T>::load;
    case -213075060: return Storage::load_implementation_helper<Optional < int64_t >, T>::load;
    case 102294406: return Storage::load_implementation_helper<class_instance<C$VK$TL$RpcResponse>, T>::load;
    case 225563081: return Storage::load_implementation_helper<class_instance<C$KphpJobWorkerResponse>, T>::load;
    case 413252784: return Storage::load_implementation_helper<mixed, T>::load;
    case 487172279: return Storage::load_implementation_helper<array< class_instance<C$VK$TL$RpcResponse> >, T>::load;
    case 1105796786: return Storage::load_implementation_helper<array< mixed >, T>::load;
    case 1180395962: return Storage::load_implementation_helper<Optional < array< mixed > >, T>::load;
    case 1518202965: return Storage::load_implementation_helper<bool, T>::load;
    case 1631794328: return Storage::load_implementation_helper<Optional < string >, T>::load;
    case 2030449513: return Storage::load_implementation_helper<thrown_exception, T>::load;
  }
  php_assert(0);
}

