
require 'yaml'

# Load default configuration
config_file = File.expand_path "_config.yml"
config = YAML::load(File.open(config_file))

# Load local configuration (if it exists)
localconfig_file = File.expand_path "_localconfig.yml"
config.merge! YAML::load(File.open(localconfig_file)) if File.exists?(localconfig_file)

deploy_ssh_target     = config['deploy']['ssh']['target']
deploy_ssh_port       = config['deploy']['ssh']['port']
deploy_remote_path    = config['deploy']['remote_path']

preview_url           = config['preview_url']

deploy_root           = "_deploy"

def ok_failed(condition)
  if (condition)
    puts "OK"
  else
    puts "FAILED"
  end
end

desc "Deploy website"
task :deploy do
    ok_failed system "jekyll #{deploy_root}"
    ok_failed system "rsync -avze 'ssh -p #{deploy_ssh_port}' #{deploy_root}/ #{deploy_ssh_target}:#{deploy_remote_path}"
end

desc "Preview website locally"
task :preview do
    system "jekyll --auto --server --url=#{preview_url}"
end
