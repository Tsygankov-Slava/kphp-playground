//crc64:22d505552bf4675c
//crc64_with_comments:0000000000000000
#include "runtime-headers.h"
#include "server/php-init-scripts.h"
#include "o_77/src_f563ae0e1447be3747f7c2b0ea231c7175209d98c3dbe8ab.h"

void global_init_php_scripts() noexcept ;
void init_php_scripts() noexcept ;

void const_vars_init() noexcept ;

void tl_str_const_init() noexcept ;
const char *get_php_scripts_version() noexcept {
  return "unknown";
}

char **get_runtime_options(int *count) noexcept {
  return nullptr;
}

void global_init_php_scripts()  noexcept {
  const_vars_init();
}

void f$src_f563ae0e1447be3747f7c2b0ea231c7175209d98c3dbe8ab$run()  noexcept {
  TRY_CALL_VOID (void, f$src_f563ae0e1447be3747f7c2b0ea231c7175209d98c3dbe8ab());
  finish (0, true);
}

void f$src_f563ae0e1447be3747f7c2b0ea231c7175209d98c3dbe8ab$global_reset()  noexcept {
  void f$src_f563ae0e1447be3747f7c2b0ea231c7175209d98c3dbe8ab$global_vars_reset();
  f$src_f563ae0e1447be3747f7c2b0ea231c7175209d98c3dbe8ab$global_vars_reset();
}

void init_php_scripts()  noexcept {
  void init_shape_demangler();
  init_shape_demangler();

  f$src_f563ae0e1447be3747f7c2b0ea231c7175209d98c3dbe8ab$global_reset();
  set_script (f$src_f563ae0e1447be3747f7c2b0ea231c7175209d98c3dbe8ab$run, f$src_f563ae0e1447be3747f7c2b0ea231c7175209d98c3dbe8ab$global_reset);
}
