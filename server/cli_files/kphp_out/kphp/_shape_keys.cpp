//crc64:86ce23b747569820
//crc64_with_comments:0000000000000000
#include "runtime-headers.h"

void init_shape_demangler() noexcept {
  std::unordered_map<std::int64_t, std::string_view> shape_keys_storage{
  };

  vk::singleton<ShapeKeyDemangle>::get().init(std::move(shape_keys_storage));
}


